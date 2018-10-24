import { NoteSpec } from '../../../src/compile/types'
import applyOffset from '../../../src/utilities/applyOffset'
import { Index, Offset } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { BuildHafuhafuNoteSpecParameters } from './types'
import * as hafuhafuFrom from './utilities/from'

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
            index: to.Index(applyOffset(hafuhafuFrom.Cell(cell), PITCH_INDEX_BASE_OFFSET)),
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
