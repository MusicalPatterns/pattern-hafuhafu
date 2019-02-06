import { apply, from, negative, OCTAVE, Ordinal, random, Scalar, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'
import { HafuhafuContourElement, HafuhafuContourParameters } from './types'

const pitchCircularityOutObjectStyleContourElement: (parameters: HafuhafuContourParameters) => HafuhafuContourElement =
    (parameters: HafuhafuContourParameters): HafuhafuContourElement => {
        const { deletionStyle, partIndex, cellCount, iterationLength, block } = parameters

        const progress: Scalar = to.Scalar(from.Ordinal(partIndex) / from.Cardinal(iterationLength))
        const gainForce: number = from.Base(apply.Power(OCTAVE, to.Power(1 - from.Scalar(progress)))) - 1
        const gain: Scalar = to.Scalar(deletionStyle === DeletionStyle.FADE ? gainForce : random() < gainForce ? 1 : 0)
        const duration: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(from.Scalar(negative(progress))))))
        const sustain: Scalar = to.Scalar(from.Scalar(duration) / from.Base(OCTAVE))
        const pitch: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(from.Scalar(progress)))))
        const cellIndex: Ordinal = to.Ordinal(from.Ordinal(partIndex) % from.Cardinal(cellCount))
        const cell: number = apply.Ordinal(block, cellIndex)

        return { cell, duration, gain, pitch, sustain }
    }

export {
    pitchCircularityOutObjectStyleContourElement,
}
