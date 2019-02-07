import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { apply, Block, Cardinal, Cycle, deepClone, deepEqual, NEXT, sequence, to } from '@musical-patterns/utilities'
import { Direction, HafuhafuSpec } from '../types'
import { buildNextBlock } from './blocks'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildCycle: (block: Block) => Cycle<Block> =
    (block: Block): Cycle<Block> => {
        const hafuhafuCycle: Cycle<Block> = to.Cycle([ deepClone(block) ])

        let nextBlock: Block = buildNextBlock(block)
        while (!deepEqual(block, nextBlock)) {
            hafuhafuCycle.push(deepClone(nextBlock))
            nextBlock = buildNextBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const buildEntities: BuildEntitiesFunction =
    (spec: HafuhafuSpec): Entity[] => {
        const block: Block = spec.block
        const iterationLength: Cardinal = spec.iterationLength

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
        const iterationLength: Cardinal = spec.iterationLength

        const inEntity: Entity = {
            noteSpecs: sequence(
                apply.Translation(buildCycle(block), NEXT)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(
                            cycleBlock,
                            iterationLength,
                            Direction.IN,
                            spec.deletionStyle,
                        )),
            ),
            timbreName: TimbreNameEnum.WURLITZER,
        }

        const outEntity: Entity = {
            noteSpecs: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(
                            cycleBlock,
                            iterationLength,
                            Direction.OUT,
                            spec.deletionStyle,
                        )),
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
