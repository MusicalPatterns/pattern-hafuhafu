import {
    applyCycle,
    Block,
    BuildEntitiesFunction,
    Count,
    Entity,
    OscillatorName,
    Part,
    sequence,
    TimeType,
    to,
    VoiceType,
} from '../../../../src'
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
            timeType: TimeType.RAW,
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
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            part: sequence(
                buildCycle(block)
                    .map((cycleBlock: Block): Part =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, iterationLength, Direction.OUT)),
            ),
            timeType: TimeType.RAW,
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
