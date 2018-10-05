import { FULL_GAIN, ONE, TWO } from '../../../src/constants'
import { Notes } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Count, Index, Scalar, Time } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import raise from '../../../src/utilities/raise'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { hafuhafuNote } from './notes'
import { Rhythm } from './types'
import { Cell } from './utilities/nominalTypes'

// tslint:disable-next-line:no-any no-magic-numbers
const SPEED_ADJUST: Scalar = 25 as any
// tslint:disable-next-line:no-any no-magic-numbers
const ALMOST_ALL: Scalar = 0.8 as any

const hafuhafuNotes: (rhythm: Rhythm, barCount: Count) => Notes =
    (rhythm: Rhythm, barCount: Count): Notes => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: Notes = []

        for (
            let i: Index = to.Index(0);
            i < to.Index(from.Count(cellCount) * from.Count(barCount));
            i = offset(i, to.Offset(1))
        ) {
            const progress: Scalar = to.Scalar(from.Index(i) / (from.Count(cellCount) * from.Count(barCount)))
            const exponentiatedInverseProgress: number = raise(TWO, to.Power(ONE - from.Scalar(progress)))
            const gain: Scalar = from.Index(i) % TWO === 0 ? FULL_GAIN : to.Scalar(exponentiatedInverseProgress - ONE)
            const duration: Time = to.Time(scale(exponentiatedInverseProgress, SPEED_ADJUST))
            const sustain: Time = to.Time(from.Scalar(scale(ALMOST_ALL, SPEED_ADJUST)))

            const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
            output.push(hafuhafuNote(cell, gain, duration, sustain, to.Scalar(1)))
        }

        return output
    }

export {
    hafuhafuNotes,
}
