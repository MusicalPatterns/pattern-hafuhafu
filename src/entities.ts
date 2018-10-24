import { Entities, Entity, NoteSpecs, TimeType } from '../../../src/compile/types'
import { OscillatorName, VoiceType } from '../../../src/types'
import rotateCycle from '../../../src/utilities/rotateCycle'
import sequence from '../../../src/utilities/sequence'
import * as to from '../../../src/utilities/to'
import { BAR_COUNT } from './constants'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNoteSpecs } from './hafuhafuNoteSpecs'
import { hafuhafuWithPitchCircularityNoteSpecs } from './hafuhafuWithPitchCircularityNoteSpecs'
import { HafuhafuSongSpec } from './songSpecs'
import { Direction, Rhythm } from './types'

const buildHafuhafuEntities: (songSpec: HafuhafuSongSpec) => Entities =
    (songSpec: HafuhafuSongSpec): Entities => {
        const rhythm: Rhythm = songSpec.rhythm

        const hafuhafuEntity: Entity = {
            noteSpecs: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): NoteSpecs =>
                    hafuhafuNoteSpecs(cycleRhythm, BAR_COUNT))),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            hafuhafuEntity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntities: (songSpec: HafuhafuSongSpec) => Entities =
    (songSpec: HafuhafuSongSpec): Entities => {
        const rhythm: Rhythm = songSpec.rhythm

        const hafuhafuInEntity: Entity = {
            noteSpecs: sequence(
                rotateCycle(hafuhafuCycle(rhythm), to.Offset(1)).map((cycleRhythm: Rhythm): NoteSpecs =>
                    hafuhafuWithPitchCircularityNoteSpecs(cycleRhythm, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntity: Entity = {
            noteSpecs: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): NoteSpecs =>
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
