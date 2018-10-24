import { NoteSpecs } from '../../../src/compile/types'
import { FULL_GAIN, ONE, TWO } from '../../../src/constants'
import applyOffset from '../../../src/utilities/applyOffset'
import * as from from '../../../src/utilities/from'
import { Count, Index, Scalar } from '../../../src/utilities/nominalTypes'
import raise from '../../../src/utilities/raise'
import * as to from '../../../src/utilities/to'
import { buildHafuhafuNoteSpec } from './notes'
import { Rhythm } from './types'
import { Cell } from './utilities/nominalTypes'

// tslint:disable-next-line:no-any no-magic-numbers
const ALMOST_ALL: Scalar = 0.8 as any

const hafuhafuNoteSpecs: (rhythm: Rhythm, barCount: Count) => NoteSpecs =
    (rhythm: Rhythm, barCount: Count): NoteSpecs => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: NoteSpecs = []

        for (
            let i: Index = to.Index(0);
            i < to.Index(from.Count(cellCount) * from.Count(barCount));
            i = applyOffset(i, to.Offset(1))
        ) {
            const progress: Scalar = to.Scalar(from.Index(i) / (from.Count(cellCount) * from.Count(barCount)))
            const exponentiatedInverseProgress: number = raise(TWO, to.Power(ONE - from.Scalar(progress)))
            const gain: Scalar = from.Index(i) % TWO === 0 ? FULL_GAIN : to.Scalar(exponentiatedInverseProgress - ONE)
            const duration: Scalar = to.Scalar(exponentiatedInverseProgress)
            const sustain: Scalar = to.Scalar(from.Scalar(ALMOST_ALL))
            const pitch: Scalar = to.Scalar(1)

            const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
            output.push(buildHafuhafuNoteSpec({ cell, gain, duration, sustain, pitch }))
        }

        return output
    }

export {
    hafuhafuNoteSpecs,
}
