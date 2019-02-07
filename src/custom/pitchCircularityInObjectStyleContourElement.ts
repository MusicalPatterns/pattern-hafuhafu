import { apply, difference, from, OCTAVE, Ordinal, quotient, Scalar, to } from '@musical-patterns/utilities'
import { HafuhafuContourElement, HafuhafuContourParameters } from './types'

const pitchCircularityInObjectStyleContourElement: (parameters: HafuhafuContourParameters) => HafuhafuContourElement =
    (parameters: HafuhafuContourParameters): HafuhafuContourElement => {
        const { partIndex, cellCount, iterationLength, block } = parameters

        const progress: Scalar = to.Scalar(quotient(from.Ordinal(partIndex), from.Cardinal(iterationLength)))
        const gain: Scalar = progress
        const duration: Scalar =
            to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(difference(1, from.Scalar(progress))))))
        const sustain: Scalar = to.Scalar(quotient(from.Scalar(duration), from.Base(OCTAVE)))
        const pitch: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(difference(from.Scalar(progress), 1)))))
        const cellIndex: Ordinal = apply.Modulus(partIndex, to.Modulus(from.Cardinal(cellCount)))
        const cell: number = apply.Ordinal(block, cellIndex)

        return { cell, duration, gain, pitch, sustain }
    }

export {
    pitchCircularityInObjectStyleContourElement,
}
