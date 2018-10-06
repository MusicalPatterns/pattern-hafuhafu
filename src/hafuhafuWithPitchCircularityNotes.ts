import { ONE, TWO } from '../../../src/constants'
import { Notes } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Count, Index, Scalar, Time } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import raise from '../../../src/utilities/raise'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { hafuhafuNote } from './notes'
import { Direction, Rhythm } from './types'
import { Cell } from './utilities/nominalTypes'

const hafuhafuWithPitchCircularityNotes: (rhythm: Rhythm, barCount: Count, direction: Direction) => Notes =
    (rhythm: Rhythm, barCount: Count, direction: Direction): Notes => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: Notes = []

        if (direction === Direction.IN) {
            const totalNotesCount: Count = to.Count(from.Count(cellCount) * from.Count(barCount))
            for (let i: Index = to.Index(0); i < to.Index(from.Count(totalNotesCount)); i = offset(i, to.Offset(1))) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))

                const gain: Scalar = progress
                const duration: Time = to.Time(raise(TWO, to.Power(ONE - from.Scalar(progress))))
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar(raise(TWO, to.Power(from.Scalar(progress) - ONE)))

                const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
                output.push(hafuhafuNote(cell, gain, duration, sustain, pitchScalar))

            }
        } else if (direction === Direction.OUT) {
            const totalNotesCount: Count = to.Count(scale(
                from.Count(cellCount) * from.Count(barCount),
                HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
            ))
            for (let i: Index = to.Index(0); i < to.Index(from.Count(totalNotesCount)); i = offset(i, to.Offset(1))) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))

                const gain: Scalar =  to.Scalar(raise(TWO, to.Power(ONE - from.Scalar(progress))) - ONE)
                const duration: Time = to.Time(raise(TWO, to.Power(-from.Scalar(progress))))
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar(raise(TWO, to.Power(from.Scalar(progress))))

                const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
                output.push(hafuhafuNote(cell, gain, duration, sustain, pitchScalar))
            }
        }

        return output
    }

export {
    hafuhafuWithPitchCircularityNotes,
}
