import { apply, from, Index, OCTAVE, Scalar, to } from '@musical-patterns/utilities'
import { HafuhafuContourElement, HafuhafuContourParameters } from './types'

const pitchCircularityInObjectStyleContourElement: (parameters: HafuhafuContourParameters) => HafuhafuContourElement =
    (parameters: HafuhafuContourParameters): HafuhafuContourElement => {
        const { partIndex, cellCount, iterationLength, block } = parameters

        const progress: Scalar = to.Scalar(from.Index(partIndex) / from.Count(iterationLength))
        const gain: Scalar = progress
        const duration: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))))
        const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Base(OCTAVE))
        const pitch: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(from.Scalar(progress) - 1))))
        const cellIndex: Index = to.Index(from.Index(partIndex) % from.Count(cellCount))
        const cell: number = apply.Index(block, cellIndex)

        return { cell, duration, gain, pitch, sustain }
    }

export {
    pitchCircularityInObjectStyleContourElement,
}
