import { applyOffset, applyScale, Count, from, Index, NoteSpec, ONE, raise, Scalar, to, TWO } from '../../../src'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { Cell } from './nominal'
import { buildHafuhafuNoteSpec } from './notes'
import { Direction, Rhythm } from './types'

const hafuhafuWithPitchCircularityNoteSpecs: (rhythm: Rhythm, barCount: Count, direction: Direction) => NoteSpec[] =
    (rhythm: Rhythm, barCount: Count, direction: Direction): NoteSpec[] => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: NoteSpec[] = []

        if (direction === Direction.IN) {
            const totalNotesCount: Count = to.Count(from.Count(cellCount) * from.Count(barCount))
            for (
                let i: Index = to.Index(0);
                i < to.Index(from.Count(totalNotesCount));
                i = applyOffset(i, to.Offset(1))
            ) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))

                const gain: Scalar = progress
                const duration: Scalar = to.Scalar(raise(TWO, to.Power(ONE - from.Scalar(progress))))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / TWO)
                const pitch: Scalar = to.Scalar(raise(TWO, to.Power(from.Scalar(progress) - ONE)))

                const cell: Cell = rhythm[ from.Index(i) % from.Count(cellCount) ]
                output.push(buildHafuhafuNoteSpec({ cell, gain, duration, sustain, pitch }))

            }
        }
        else if (direction === Direction.OUT) {
            const totalNotesCount: Count = to.Count(applyScale(
                from.Count(cellCount) * from.Count(barCount),
                HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
            ))
            for (
                let i: Index = to.Index(0);
                i < to.Index(from.Count(totalNotesCount));
                i = applyOffset(i, to.Offset(1))
            ) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))

                const gain: Scalar = to.Scalar(raise(TWO, to.Power(ONE - from.Scalar(progress))) - ONE)
                const duration: Scalar = to.Scalar(raise(TWO, to.Power(-from.Scalar(progress))))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / TWO)
                const pitch: Scalar = to.Scalar(raise(TWO, to.Power(from.Scalar(progress))))

                const cell: Cell = rhythm[ from.Index(i) % from.Count(cellCount) ]
                output.push(buildHafuhafuNoteSpec({ cell, gain, duration, sustain, pitch }))
            }
        }

        return output
    }

export {
    hafuhafuWithPitchCircularityNoteSpecs,
}
