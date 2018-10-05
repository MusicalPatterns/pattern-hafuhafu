import { Note } from '../../../src/types'
import { Index, Offset, Scalar, Time } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import * as to from '../../../src/utilities/to'
import * as hafuhafuFrom from './utilities/from'
import { Cell } from './utilities/nominalTypes'

// tslint:disable-next-line:no-any no-magic-numbers
const BASE_SCALE: Index = 0 as any
// tslint:disable-next-line:no-any no-magic-numbers
const PITCH_INDEX_BASE_OFFSET: Offset = 1 as any

const hafuhafuNote: (cell: Cell, gain: Scalar, duration: Time, sustain: Time, pitchScalar: Scalar) => Note =
    (cell: Cell, gain: Scalar, duration: Time, sustain: Time, pitchScalar: Scalar): Note => ({
        duration,
        gain,
        pitchIndex: to.Index(offset(hafuhafuFrom.Cell(cell), PITCH_INDEX_BASE_OFFSET)),
        pitchScalar,
        scaleIndex: BASE_SCALE,
        sustain,
    })

export {
    hafuhafuNote,
}
