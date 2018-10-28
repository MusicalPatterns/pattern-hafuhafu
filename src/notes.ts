import { applyOffset, DEFAULT_DURATIONS_SCALE_INDEX, DEFAULT_PITCH_SCALE_INDEX, NoteSpec, to } from '../../../src'
import { PITCH_INDEX_BASE_OFFSET } from './constants'
import { from } from './nominal'
import { BuildHafuhafuNoteSpecParameters } from './types'

const buildHafuhafuNoteSpec: (buildHafuhafuNoteSpecParameters: BuildHafuhafuNoteSpecParameters) => NoteSpec =
    ({ cell, gain, duration, sustain, pitch }: BuildHafuhafuNoteSpecParameters): NoteSpec => ({
        durationSpec: {
            scalar: duration,
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
        gainSpec: {
            scalar: gain,
        },
        pitchSpec: {
            index: to.Index(applyOffset(from.Cell(cell), PITCH_INDEX_BASE_OFFSET)),
            scalar: pitch,
            scaleIndex: DEFAULT_PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: sustain,
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildHafuhafuNoteSpec,
}
