import { applyCycle, Block, Entity, OscillatorName, Part, sequence, TimeType, to, VoiceType } from '../../../../src'
import { BAR_COUNT } from '../constants'
import { buildHafuhafuCycle } from '../custom'
import { Direction, HafuhafuPatternSpec } from '../types'
import { buildHafuhafuPart, buildHafuhafuWithPitchCircularityPart } from './parts'

const buildHafuhafuEntities: (patternSpec: HafuhafuPatternSpec) => Entity[] =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block

        const hafuhafuEntity: Entity = {
            part: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): Part =>
                        buildHafuhafuPart(cycleBlock, BAR_COUNT))),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            hafuhafuEntity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: (patternSpec: HafuhafuPatternSpec) => Entity[] =
    (patternSpec: HafuhafuPatternSpec): Entity[] => {
        const block: Block = patternSpec.block

        const hafuhafuInEntity: Entity = {
            part: sequence(
                applyCycle(buildHafuhafuCycle(block), to.Offset(1))
                    .map((cycleBlock: Block): Part =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            part: sequence(
                buildHafuhafuCycle(block)
                    .map((cycleBlock: Block): Part =>
                        buildHafuhafuWithPitchCircularityPart(cycleBlock, BAR_COUNT, Direction.OUT)),
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
    buildHafuhafuEntities,
    buildHafuhafuWithPitchCircularityEntities,
}
