import { PitchDurationGain } from '@musical-patterns/pattern'
import {
    apply,
    Block,
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
import { DeletionStyle, HafuhafuSpecs } from '../spec'
import { GUESS_AT_A_GOOD_BASE_FOR_THE_HAFUHAFU_PROCESS } from './constants'
import { HafuhafuContourParameters } from './types'

const computeContourElement: (parameters: HafuhafuContourParameters) => ContourElement<PitchDurationGain> =
    (parameters: HafuhafuContourParameters): ContourElement<PitchDurationGain> => {
        const { pieceIndex, cellCount, specs, cycleBlock } = parameters
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
        const pitch: number = apply.Ordinal(cycleBlock, cellIndex)

        return to.ContourElement<PitchDurationGain>([ pitch, duration, gain ])
    }

const computePiece: (cycleBlock: Block, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGain> =
    (cycleBlock: Block, specs: HafuhafuSpecs): ContourPiece<PitchDurationGain> => {
        const cellCount: Cardinal = totalElements(cycleBlock)
        const piece: ContourPiece<PitchDurationGain> = to.ContourPiece<PitchDurationGain>([])

        for (
            let pieceIndex: Ordinal = INITIAL;
            pieceIndex < to.Ordinal(from.Cardinal(product(cellCount, specs.iterationLength)));
            pieceIndex = apply.Translation(pieceIndex, NEXT)
        ) {
            const contourElement: ContourElement<PitchDurationGain> = computeContourElement({
                cellCount,
                cycleBlock,
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
