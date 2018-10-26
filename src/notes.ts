import { applyOffset, Index, NoteSpec, Offset, to } from '../../../src'
import { from } from './nominal'
import { BuildHafuhafuNoteSpecParameters } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const PITCH_INDEX_BASE_OFFSET: Offset = 1 as any

// tslint:disable-next-line:no-any no-magic-numbers
const DURATIONS_SCALE_INDEX: Index = 1 as any
// tslint:disable-next-line:no-any no-magic-numbers
const PITCH_SCALE_INDEX: Index = 2 as any

const buildHafuhafuNoteSpec: (buildHafuhafuNoteSpecParameters: BuildHafuhafuNoteSpecParameters) => NoteSpec =
    ({ cell, gain, duration, sustain, pitch }: BuildHafuhafuNoteSpecParameters): NoteSpec => ({
        durationSpec: {
            scalar: duration,
            scaleIndex: DURATIONS_SCALE_INDEX,
        },
        gainSpec: {
            scalar: gain,
        },
        pitchSpec: {
            index: to.Index(applyOffset(from.Cell(cell), PITCH_INDEX_BASE_OFFSET)),
            scalar: pitch,
            scaleIndex: PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: sustain,
            scaleIndex: DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildHafuhafuNoteSpec,
}
