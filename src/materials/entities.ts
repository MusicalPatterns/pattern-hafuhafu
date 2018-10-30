import { applyCycle, Block, Entity, OscillatorName, Part, sequence, TimeType, to, VoiceType } from '../../../../src'
import { BAR_COUNT } from '../constants'
import { buildHafuhafuCycle } from '../custom'
import { Direction, HafuhafuSongSpec } from '../types'
import { buildHafuhafuPart, buildHafuhafuWithPitchCircularityPart } from './parts'

const buildHafuhafuEntities: (songSpec: HafuhafuSongSpec) => Entity[] =
    (songSpec: HafuhafuSongSpec): Entity[] => {
        const block: Block = songSpec.block

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

const buildHafuhafuWithPitchCircularityEntities: (songSpec: HafuhafuSongSpec) => Entity[] =
    (songSpec: HafuhafuSongSpec): Entity[] => {
        const block: Block = songSpec.block

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
