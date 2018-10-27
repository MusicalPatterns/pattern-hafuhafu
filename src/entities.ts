import { Entity, NoteSpec, OscillatorName, rotateCycle, sequence, TimeType, to, VoiceType } from '../../../src'
import { BAR_COUNT } from './constants'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNoteSpecs } from './hafuhafuNoteSpecs'
import { hafuhafuWithPitchCircularityNoteSpecs } from './hafuhafuWithPitchCircularityNoteSpecs'
import { Direction, HafuhafuSongSpec, Rhythm } from './types'

const buildHafuhafuEntities: (songSpec: HafuhafuSongSpec) => Entity[] =
    (songSpec: HafuhafuSongSpec): Entity[] => {
        const rhythm: Rhythm = songSpec.rhythm

        const hafuhafuEntity: Entity = {
            noteSpecs: sequence(
                hafuhafuCycle(rhythm)
                    .map((cycleRhythm: Rhythm): NoteSpec[] =>
                        hafuhafuNoteSpecs(cycleRhythm, BAR_COUNT))),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            hafuhafuEntity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: (songSpec: HafuhafuSongSpec) => Entity[] =
    (songSpec: HafuhafuSongSpec): Entity[] => {
        const rhythm: Rhythm = songSpec.rhythm

        const hafuhafuInEntity: Entity = {
            noteSpecs: sequence(
                rotateCycle(hafuhafuCycle(rhythm), to.Offset(1))
                    .map((cycleRhythm: Rhythm): NoteSpec[] =>
                        hafuhafuWithPitchCircularityNoteSpecs(cycleRhythm, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            noteSpecs: sequence(
                hafuhafuCycle(rhythm)
                    .map((cycleRhythm: Rhythm): NoteSpec[] =>
                        hafuhafuWithPitchCircularityNoteSpecs(cycleRhythm, BAR_COUNT, Direction.OUT)),
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
