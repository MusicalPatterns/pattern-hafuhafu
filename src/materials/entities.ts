import { BuildEntitiesFunction, Entity, PartSpec } from '@musical-patterns/compiler'
import { Block, to as patternTo } from '@musical-patterns/pattern'
import { OscillatorName, VoiceType } from '@musical-patterns/performer'
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
            partSpec: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): PartSpec =>
                        buildPart(cycleBlock, iterationLength))),
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
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
            partSpec: sequence(
                cycle(buildHafuhafuCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): PartSpec =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            partSpec: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): PartSpec =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.OUT)),
            ),
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
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
