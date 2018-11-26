import { OscillatorName, VoiceType } from '@musical-patterns/performer'
import { Count, cycle, sequence, to } from '@musical-patterns/shared'
import { Entity, PartSpec } from '../../../../compile'
import { Block } from '../../../../nominal'
import { BuildEntitiesFunction } from '../../../types'
import { buildCycle } from '../custom'
import { Direction, HafuhafuPatternSpec } from '../types'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const hafuhafuEntity: Entity = {
            partSpec: sequence(
                buildCycle(block)
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
                cycle(buildCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): PartSpec =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            partSpec: sequence(
                buildCycle(block)
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
    buildHafuhafuWithPitchCircularityEntities,
}
