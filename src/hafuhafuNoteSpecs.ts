import { applyOffset, Count, from, FULL_GAIN, Index, NoteSpec, ONE, raise, Scalar, to, TWO } from '../../../src'
import { Cell } from './nominal'
import { buildHafuhafuNoteSpec } from './notes'
import { Rhythm } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const ALMOST_ALL: Scalar = 0.8 as any

const hafuhafuNoteSpecs: (rhythm: Rhythm, barCount: Count) => NoteSpec[] =
    (rhythm: Rhythm, barCount: Count): NoteSpec[] => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: NoteSpec[] = []

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
