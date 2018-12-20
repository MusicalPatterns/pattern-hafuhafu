import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Count, cycle, deepEqual, sequence, to } from '@musical-patterns/utilities'
import { Cycle, Direction, HafuhafuPatternSpec } from '../types'
import { buildBlock } from './blocks'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildCycle: (block: Block) => Cycle =
    (block: Block): Cycle => {
        const hafuhafuCycle: Cycle = [ block.slice() ].map(to.Block)

        let nextBlock: Block = buildBlock(block)
        while (!deepEqual(block, nextBlock)) {
            hafuhafuCycle.push(to.Block(nextBlock.slice()))
            nextBlock = buildBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const buildEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const entity: Entity = {
            noteSpecs: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildPart(cycleBlock, iterationLength))),
            timbreName: TimbreNameEnum.SQUARE,
        }

        return [
            entity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const inEntity: Entity = {
            noteSpecs: sequence(
                cycle(buildCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            timbreName: TimbreNameEnum.SQUARE,
        }

        const outEntity: Entity = {
            noteSpecs: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.OUT)),
            ),
            timbreName: TimbreNameEnum.SQUARE,
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
