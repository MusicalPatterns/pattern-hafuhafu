import { apply, difference, from, isEven, Ordinal, random, reciprocal, Scalar, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'
import { BASE_FOR_GAIN_FADE } from './constants'
import { HafuhafuContourElement, HafuhafuContourParameters } from './types'

const hafuhafuContourElement: (parameters: HafuhafuContourParameters) => HafuhafuContourElement =
    (parameters: HafuhafuContourParameters): HafuhafuContourElement => {
        const { deletionStyle, partIndex, cellCount, iterationLength, block } = parameters

        const progress: Scalar = to.Scalar(from.Ordinal(apply.Cardinal(
            partIndex,
            reciprocal(apply.Cardinal(cellCount, iterationLength)),
        )))

        const exponentiatedInverseProgress: number = from.Base(
            apply.Power(BASE_FOR_GAIN_FADE, to.Power(difference(1, from.Scalar(progress)))),
        )

        const gainForce: number = isEven(from.Ordinal(partIndex)) ? 1 : difference(exponentiatedInverseProgress, 1)
        const gain: Scalar =
            to.Scalar(deletionStyle === DeletionStyle.FADE ? gainForce : random() < gainForce ? 1 : 0)
        const duration: Scalar = to.Scalar(exponentiatedInverseProgress)
        const sustain: Scalar = to.Scalar(1)
        const pitch: Scalar = to.Scalar(1)
        const cellIndex: Ordinal = apply.Modulus(partIndex, to.Modulus(from.Cardinal(cellCount)))
        const cell: number = apply.Ordinal(block, cellIndex)

        return { cell, duration, gain, pitch, sustain }
    }

export {
    hafuhafuContourElement,
}
