import { PitchDurationGain } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    ContourElement,
    ContourPiece,
    difference,
    from,
    INITIAL,
    isEven,
    NEXT,
    Ordinal,
    Power,
    product,
    random,
    reciprocal,
    Scalar,
    to,
    totalElements,
} from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { DeletionStyle, HafuhafuSpecs } from '../spec'
import { GUESS_AT_A_GOOD_BASE_FOR_THE_HAFUHAFU_PROCESS } from './constants'
import { ComputeContourElementParameters } from './types'

const computeContourElement: (parameters: ComputeContourElementParameters) => ContourElement<PitchDurationGain> =
    (parameters: ComputeContourElementParameters): ContourElement<PitchDurationGain> => {
        const { pieceIndex, cellCount, specs, cycleKernel } = parameters
        const { deletionStyle, iterationLength, reversed } = specs

        const totalCellsInIteration: Cardinal = apply.Scalar(cellCount, to.Scalar(from.Cardinal(iterationLength)))
        const progress: Scalar = to.Scalar(from.Ordinal(apply.Scalar(
            pieceIndex,
            to.Scalar(from.Cardinal(reciprocal(totalCellsInIteration))),
        )))

        const progressPower: Power = to.Power(from.Scalar<number, Scalar>(
            reversed ? progress : difference(to.Scalar(1), progress),
        ))
        const duration: number = from.Base(apply.Power(GUESS_AT_A_GOOD_BASE_FOR_THE_HAFUHAFU_PROCESS, progressPower))

        const gainForce: number = isEven(pieceIndex) ? 1 : difference(duration, 1)
        const gain: number = deletionStyle === DeletionStyle.FADE ? gainForce : random() < gainForce ? 1 : 0

        const cellIndex: Ordinal = apply.Modulus(pieceIndex, to.Modulus(from.Cardinal(cellCount)))
        const pitch: number = apply.Ordinal(cycleKernel, cellIndex)

        return to.ContourElement<PitchDurationGain>([ pitch, duration, gain ])
    }

const computePiece: (cycleKernel: Kernel, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGain> =
    (cycleKernel: Kernel, specs: HafuhafuSpecs): ContourPiece<PitchDurationGain> => {
        const cellCount: Cardinal = totalElements(cycleKernel)
        const piece: ContourPiece<PitchDurationGain> = to.ContourPiece<PitchDurationGain>([])

        for (
            let pieceIndex: Ordinal = INITIAL;
            pieceIndex < to.Ordinal(from.Cardinal(product(cellCount, specs.iterationLength)));
            pieceIndex = apply.Translation(pieceIndex, NEXT)
        ) {
            const contourElement: ContourElement<PitchDurationGain> = computeContourElement({
                cellCount,
                cycleKernel,
                pieceIndex,
                specs,
            })
            piece.push(contourElement)
        }

        return piece
    }

export {
    computePiece,
}
