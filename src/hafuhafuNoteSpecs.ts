import {
    applyOffset,
    Count,
    DEFAULT_SCALAR_FOR_ALMOST_FULL_SUSTAIN,
    EVEN,
    from,
    FULL_GAIN,
    Index,
    NoteSpec,
    raise,
    Scalar,
    to,
} from '../../../src'
import { BASE_FOR_GAIN_FADE } from './constants'
import { Cell } from './nominal'
import { buildHafuhafuNoteSpec } from './notes'
import { Rhythm } from './types'

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
            const exponentiatedInverseProgress: number = from.Base(
                raise(BASE_FOR_GAIN_FADE, to.Power(1 - from.Scalar(progress))),
            )
            const gain: Scalar = from.Index(i) % EVEN === 0 ? FULL_GAIN : to.Scalar(exponentiatedInverseProgress - 1)
            const duration: Scalar = to.Scalar(exponentiatedInverseProgress)
            const sustain: Scalar = to.Scalar(from.Scalar(DEFAULT_SCALAR_FOR_ALMOST_FULL_SUSTAIN))
            const pitch: Scalar = to.Scalar(1)

            const cell: Cell = rhythm[ from.Index(i) % from.Count(cellCount) ]
            output.push(buildHafuhafuNoteSpec({ cell, gain, duration, sustain, pitch }))
        }

        return output
    }

export {
    hafuhafuNoteSpecs,
}
