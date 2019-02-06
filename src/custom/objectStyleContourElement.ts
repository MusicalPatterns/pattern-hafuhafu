import { apply, EVEN, from, Index, random, reciprocal, Scalar, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'
import { BASE_FOR_GAIN_FADE } from './constants'
import { HafuhafuContourElement, HafuhafuContourParameters } from './types'

const hafuhafuContourElement: (parameters: HafuhafuContourParameters) => HafuhafuContourElement =
    (parameters: HafuhafuContourParameters): HafuhafuContourElement => {
        const { deletionStyle, partIndex, cellCount, iterationLength, block } = parameters

        const progress: Scalar = to.Scalar(apply.Scalar(
            from.Index(partIndex),
            to.Scalar(reciprocal(
                apply.Scalar(from.Count(cellCount), to.Scalar(from.Count(iterationLength))),
            )),
        ))

        const exponentiatedInverseProgress: number = from.Base(
            apply.Power(BASE_FOR_GAIN_FADE, to.Power(1 - from.Scalar(progress))),
        )

        const gainForce: number = from.Index(partIndex) % EVEN === 0 ? 1 : exponentiatedInverseProgress - 1
        const gain: Scalar =
            to.Scalar(deletionStyle === DeletionStyle.FADE ? gainForce : random() < gainForce ? 1 : 0)
        const duration: Scalar = to.Scalar(exponentiatedInverseProgress)
        const sustain: Scalar = to.Scalar(1)
        const pitch: Scalar = to.Scalar(1)
        const cellIndex: Index = to.Index(from.Index(partIndex) % from.Count(cellCount))
        const cell: number = apply.Index(block, cellIndex)

        return { cell, duration, gain, pitch, sustain }
    }

export {
    hafuhafuContourElement,
}
