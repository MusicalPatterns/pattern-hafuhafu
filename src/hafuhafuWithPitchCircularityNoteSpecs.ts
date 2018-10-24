import { NoteSpecs } from '../../../src/compile/types'
import { ONE, TWO } from '../../../src/constants'
import applyOffset from '../../../src/utilities/applyOffset'
import applyScale from '../../../src/utilities/applyScale'
import * as from from '../../../src/utilities/from'
import { Count, Index, Scalar } from '../../../src/utilities/nominalTypes'
import raise from '../../../src/utilities/raise'
import * as to from '../../../src/utilities/to'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { buildHafuhafuNoteSpec } from './notes'
import { Direction, Rhythm } from './types'
import { Cell } from './utilities/nominalTypes'

const hafuhafuWithPitchCircularityNoteSpecs: (rhythm: Rhythm, barCount: Count, direction: Direction) => NoteSpecs =
    (rhythm: Rhythm, barCount: Count, direction: Direction): NoteSpecs => {
        const cellCount: Count = to.Count(rhythm.length)
        const output: NoteSpecs = []

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

                const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
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

                const gain: Scalar =  to.Scalar(raise(TWO, to.Power(ONE - from.Scalar(progress))) - ONE)
                const duration: Scalar = to.Scalar(raise(TWO, to.Power(-from.Scalar(progress))))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / TWO)
                const pitch: Scalar = to.Scalar(raise(TWO, to.Power(from.Scalar(progress))))

                const cell: Cell = rhythm[from.Index(i) % from.Count(cellCount)]
                output.push(buildHafuhafuNoteSpec({ cell, gain, duration, sustain, pitch }))
            }
        }

        return output
    }

export {
    hafuhafuWithPitchCircularityNoteSpecs,
}
