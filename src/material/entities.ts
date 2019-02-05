import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Count, cycle, deepClone, deepEqual, sequence, to } from '@musical-patterns/utilities'
import { Cycle, Direction, HafuhafuSpec } from '../types'
import { buildNextBlock } from './blocks'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildCycle: (block: Block) => Cycle =
    (block: Block): Cycle => {
        const hafuhafuCycle: Cycle = [ deepClone(block) ].map(to.Block)

        let nextBlock: Block = buildNextBlock(block)
        while (!deepEqual(block, nextBlock)) {
            hafuhafuCycle.push(to.Block(nextBlock.slice()))
            nextBlock = buildNextBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const buildEntities: BuildEntitiesFunction =
    (spec: HafuhafuSpec): Entity[] => {
        const block: Block = spec.block
        const iterationLength: Count = spec.iterationLength

        const entity: Entity = {
            noteSpecs: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildPart(cycleBlock, iterationLength, spec.deletionStyle))),
            timbreName: TimbreNameEnum.WURLITZER,
        }

        return [
            entity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: BuildEntitiesFunction =
    (spec: HafuhafuSpec): Entity[] => {
        const block: Block = spec.block
        const iterationLength: Count = spec.iterationLength

        const inEntity: Entity = {
            noteSpecs: sequence(
                cycle(buildCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            timbreName: TimbreNameEnum.WURLITZER,
        }

        const outEntity: Entity = {
            noteSpecs: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.OUT)),
            ),
            timbreName: TimbreNameEnum.WURLITZER,
        }

        return [
            inEntity,
            outEntity,
        ]
    }

export {
    buildEntities,
    buildCycle,
    buildHafuhafuWithPitchCircularityEntities,
}
