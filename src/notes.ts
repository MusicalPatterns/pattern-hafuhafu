// tslint:disable:no-any no-magic-numbers

import { Note } from '../../../src/types'
import { Index, Scalar, Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import * as hafuhafuFrom from './utilities/from'
import { Cell } from './utilities/nominalTypes'

const BASE_SCALE: Index = 0 as any
const PITCH_INDEX_BASE_OFFSET: number = 1

const hafuhafuNote: (cell: Cell, gain: Scalar, duration: Time, sustain: Time) => Note =
    (cell: Cell, gain: Scalar, duration: Time, sustain: Time): Note => ({
        duration,
        gain,
        pitchIndex: to.Index(hafuhafuFrom.Cell(cell) + PITCH_INDEX_BASE_OFFSET),
        pitchScalar: to.Scalar(1),
        scaleIndex: BASE_SCALE,
        sustain,
    })

export {
    hafuhafuNote,
}
