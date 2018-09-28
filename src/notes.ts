// tslint:disable:no-any no-magic-numbers

import { Note } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Index, Scalar, Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import * as hafuhafuFrom from './utilities/from'
import { Cell } from './utilities/nominalTypes'

const SEPARATION_FOR_NEIGHBORING_NOTES: Time = 0.1 as any
const BASE_DURATION: Time = 1 as any
const BASE_SUSTAIN: Time = to.Time(from.Time(BASE_DURATION) - from.Time(SEPARATION_FOR_NEIGHBORING_NOTES))
const BASE_GAIN: Scalar = 1 as any
const BASE_SCALE: Index = 0 as any
const PITCH_INDEX_BASE_OFFSET: number = 1

const hafuhafuNote: (cell: Cell) => Note = (cell: Cell): Note => ({
    duration: BASE_DURATION,
    gain: BASE_GAIN,
    pitchIndex: to.Index(hafuhafuFrom.Cell(cell) + PITCH_INDEX_BASE_OFFSET),
    scaleIndex: BASE_SCALE,
    sustain: BASE_SUSTAIN,
})

export {
    hafuhafuNote,
}
