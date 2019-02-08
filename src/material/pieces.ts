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
    product,
    random,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { DeletionStyle, HafuhafuSpec } from '../types'
import { GUESS_AT_A_GOOD_BASE_FOR_THE_HAFUHAFU_PROCESS } from './constants'
import { HafuhafuContourParameters } from './types'

const buildContourElement: (parameters: HafuhafuContourParameters) => ContourElement<PitchDurationGain> =
    (parameters: HafuhafuContourParameters): ContourElement<PitchDurationGain> => {
        const { partIndex, cellCount, spec, cycleBlock } = parameters
        const { deletionStyle, iterationLength, reversed } = spec

        const totalCellsInIteration: Cardinal = apply.Cardinal(cellCount, iterationLength)
        const progress: Scalar = to.Scalar(from.Ordinal(apply.Cardinal(partIndex, reciprocal(totalCellsInIteration))))

        const progressPower: Scalar = reversed ? progress : difference(to.Scalar(1), progress)
        const duration: number = from.Base(apply.Power(
            GUESS_AT_A_GOOD_BASE_FOR_THE_HAFUHAFU_PROCESS,
            to.Power(from.Scalar(progressPower)),
        ))

        const gainForce: number = isEven(partIndex) ? 1 : difference(duration, 1)
        const gain: number = deletionStyle === DeletionStyle.FADE ? gainForce : random() < gainForce ? 1 : 0

        const cellIndex: Ordinal = apply.Modulus(partIndex, to.Modulus(from.Cardinal(cellCount)))
        const pitch: number = apply.Ordinal(cycleBlock, cellIndex)

        return to.ContourElement<PitchDurationGain>([ pitch, duration, gain ])
    }

const buildPiece: (cycleBlock: Block, spec: HafuhafuSpec) => ContourPiece<PitchDurationGain> =
    (cycleBlock: Block, spec: HafuhafuSpec): ContourPiece<PitchDurationGain> => {
        const cellCount: Cardinal = to.Cardinal(cycleBlock.length)
        const piece: ContourPiece<PitchDurationGain> = to.ContourPiece<PitchDurationGain>([])

        for (
            let partIndex: Ordinal = INITIAL;
            partIndex < to.Ordinal(from.Cardinal(product(cellCount, spec.iterationLength)));
            partIndex = apply.Translation(partIndex, NEXT)
        ) {
            const contourElement: ContourElement<PitchDurationGain> = buildContourElement({
                cellCount,
                cycleBlock,
                partIndex,
                spec,
            })
            piece.push(contourElement)
        }

        return piece
    }

export {
    buildPiece,
}
