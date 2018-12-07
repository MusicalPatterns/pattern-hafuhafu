import { BuildEntitiesFunction, Entity, NoteSpec, TimbreName } from '@musical-patterns/compiler'
import { Block, to as patternTo } from '@musical-patterns/pattern'
import { Count, cycle, deepEqual, sequence, to } from '@musical-patterns/utilities'
import { Cycle, Direction, HafuhafuPatternSpec } from '../types'
import { buildBlock } from './blocks'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildHafuhafuCycle: (block: Block) => Cycle =
    (block: Block): Cycle => {
        const hafuhafuCycle: Cycle = [ block.slice() ].map(patternTo.Block)

        let nextBlock: Block = buildBlock(block)
        while (!deepEqual(block, nextBlock)) {
            hafuhafuCycle.push(patternTo.Block(nextBlock.slice()))
            nextBlock = buildBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const buildEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const hafuhafuEntity: Entity = {
            noteSpecs: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildPart(cycleBlock, iterationLength))),
            timbreName: TimbreName.SQUARE,
        }

        return [
            hafuhafuEntity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const hafuhafuInEntity: Entity = {
            noteSpecs: sequence(
                cycle(buildHafuhafuCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            timbreName: TimbreName.SQUARE,
        }

        const hafuhafuOutEntity: Entity = {
            noteSpecs: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): NoteSpec[] =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.OUT)),
            ),
            timbreName: TimbreName.SQUARE,
        }

        return [
            hafuhafuInEntity,
            hafuhafuOutEntity,
        ]
    }

export {
    buildEntities,
    buildHafuhafuCycle,
    buildHafuhafuWithPitchCircularityEntities,
}
