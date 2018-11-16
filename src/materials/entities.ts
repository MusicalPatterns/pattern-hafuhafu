import { OscillatorName, VoiceType } from '@musical-patterns/performer'
import {
    applyCycle,
    Block,
    Count,
    Entity,
    Part,
    sequence,
    to,
} from '../../../../src'
import { BuildEntitiesFunction } from '../../../types'
import { buildCycle } from '../custom'
import { Direction, HafuhafuPatternSpec } from '../types'
import { buildHafuhafuWithPitchCircularityPart, buildPart } from './parts'

const buildEntities: BuildEntitiesFunction =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block
        const iterationLength: Count = patternSpec.iterationLength

        const hafuhafuEntity: Entity = {
            part: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): Part =>
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
            part: sequence(
                applyCycle(buildCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): Part =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.IN)),
            ),
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            part: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): Part =>
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
