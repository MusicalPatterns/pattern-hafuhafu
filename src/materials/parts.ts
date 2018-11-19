import { apply, Count, from, Index, Scalar, to } from '@musical-patterns/utilities'
import { Block, DEFAULT_SCALAR_FOR_ALMOST_FULL_SUSTAIN, EVEN, FULL_GAIN, OCTAVE, PartSpec } from '../../../../src'
import { BASE_FOR_GAIN_FADE, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from '../constants'
import { Direction } from '../types'
import { buildNoteSpec } from './notes'

const buildPart: (block: Block, iterationLength: Count) => PartSpec =
    (block: Block, iterationLength: Count): PartSpec => {
        const cellCount: Count = to.Count(block.length)
        const part: PartSpec = []

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
            const sustain: Scalar = to.Scalar(from.Scalar(DEFAULT_SCALAR_FOR_ALMOST_FULL_SUSTAIN))
            const pitch: Scalar = to.Scalar(1)
            const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
            const cell: Index = apply.Index(block, cellIndex)
            part.push(buildNoteSpec({ cell, gain, duration, sustain, pitch }))
        }

        return part
    }

const buildHafuhafuWithPitchCircularityPart: (block: Block, iterationLength: Count, direction: Direction) => PartSpec =
    (block: Block, iterationLength: Count, direction: Direction): PartSpec => {
        const cellCount: Count = to.Count(block.length)
        const part: PartSpec = []

        if (direction === Direction.IN) {
            const totalNotesCount: Count = to.Count(from.Count(cellCount) * from.Count(iterationLength))
            for (
                let i: Index = to.Index(0);
                i < to.Index(from.Count(totalNotesCount));
                i = apply.Offset(i, to.Offset(1))
            ) {
                const progress: Scalar = to.Scalar(from.Index(i) / from.Count(totalNotesCount))
                const gain: Scalar = progress
                const duration: Scalar = apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Scalar(OCTAVE))
                const pitch: Scalar = apply.Power(OCTAVE, to.Power(from.Scalar(progress) - 1))
                const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
                const cell: Index = apply.Index(block, cellIndex)
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
                const gain: Scalar =
                    to.Scalar(from.Scalar(apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))) - 1)
                const duration: Scalar = apply.Power(OCTAVE, to.Power(-from.Scalar(progress)))
                const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Scalar(OCTAVE))
                const pitch: Scalar = apply.Power(OCTAVE, to.Power(from.Scalar(progress)))
                const cellIndex: Index = to.Index(from.Index(i) % from.Count(cellCount))
                const cell: Index = apply.Index(block, cellIndex)
                part.push(buildNoteSpec({ cell, gain, duration, sustain, pitch }))
            }
        }

        return part
    }

export {
    buildPart,
    buildHafuhafuWithPitchCircularityPart,
}
