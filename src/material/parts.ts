import { NoteSpec } from '@musical-patterns/compiler'
import { FULL_GAIN } from '@musical-patterns/pattern'
import { apply, Block, Count, EVEN, from, Index, OCTAVE, Scalar, to } from '@musical-patterns/utilities'
import { BASE_FOR_GAIN_FADE, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from '../constants'
import { Direction } from '../types'
import { buildNoteSpec } from './notes'

const buildPart: (block: Block, iterationLength: Count) => NoteSpec[] =
    (block: Block, iterationLength: Count): NoteSpec[] => {
        const cellCount: Count = to.Count(block.length)
        const part: NoteSpec[] = []

        for (
            let i: Index = to.Index(0);
            i < to.Index(from.Count(cellCount) * from.Count(iterationLength));
            i = apply.Offset(i, to.Offset(1))
        ) {
            const progress: Scalar = to.Scalar(from.Index(i) / (from.Count(cellCount) * from.Count(iterationLength)))

            const exponentiatedInverseProgress: number = from.Base(
                apply.Power(BASE_FOR_GAIN_FADE, to.Power(1 - from.Scalar(progress))),
            )

            const gain: Scalar = from.Index(i) % EVEN === 0 ? FULL_GAIN : to.Scalar(exponentiatedInverseProgress - 1)
            const duration: Scalar = to.Scalar(exponentiatedInverseProgress)
            const sustain: Scalar = to.Scalar(1)
            const pitch: Scalar = to.Scalar(1)
            const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
            const cell: number = apply.Index(block, cellIndex)
            part.push(buildNoteSpec({ cell, gain, duration, sustain, pitch }))
        }

        return part
    }

const buildHafuhafuWithPitchCircularityPart:
    (block: Block, iterationLength: Count, direction: Direction) => NoteSpec[] =
    (block: Block, iterationLength: Count, direction: Direction): NoteSpec[] => {
        const cellCount: Count = to.Count(block.length)
        const part: NoteSpec[] = []

        if (direction === Direction.IN) {
            const totalNotesCount: Count = to.Count(from.Count(cellCount) * from.Count(iterationLength))
            for (
                let i: Index = to.Index(0);
                i < to.Index(from.Count(totalNotesCount));
                i = apply.Offset(i, to.Offset(1))
            ) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))
                const gain: Scalar = progress
                const duration: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Base(OCTAVE))
                const pitch: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(from.Scalar(progress) - 1))))
                const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
                const cell: number = apply.Index(block, cellIndex)
                part.push(buildNoteSpec({ cell, gain, duration, sustain, pitch }))
            }
        }
        else if (direction === Direction.OUT) {
            const totalNotesCount: Count = to.Count(apply.Scalar(
                from.Count(cellCount) * from.Count(iterationLength),
                HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
            ))
            for (
                let i: Index = to.Index(0);
                i < to.Index(from.Count(totalNotesCount));
                i = apply.Offset(i, to.Offset(1))
            ) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))
                const gain: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))) - 1)
                const duration: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(-from.Scalar(progress)))))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Base(OCTAVE))
                const pitch: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(from.Scalar(progress)))))
                const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
                const cell: number = apply.Index(block, cellIndex)
                part.push(buildNoteSpec({ cell, gain, duration, sustain, pitch }))
            }
        }

        return part
    }

export {
    buildPart,
    buildHafuhafuWithPitchCircularityPart,
}
