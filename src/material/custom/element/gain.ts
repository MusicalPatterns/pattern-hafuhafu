import { FULL_GAIN, SILENT } from '@musical-patterns/material'
import {
    as,
    Gain,
    invertUnitScalar,

    random,
    Scalar,
    UnitScalar,
    use,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import {
    CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
    DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
    HALFWAY_THROUGH,
} from './constants'
import { ComputeGainParameters, ComputeRandomDropGainParameters } from './types'

const computeRandomDropGain: (parameters: {
    fadingGain: Scalar<Gain>,
    randomizingFunction: (within?: number) => number,
}) => Scalar<Gain> =
    ({ fadingGain, randomizingFunction }: ComputeRandomDropGainParameters): Scalar<Gain> =>
        randomizingFunction() < as.number(fadingGain) ?
            FULL_GAIN :
            SILENT

const transformProgressToUseItForFirstHalf: (elementProgress: UnitScalar) => UnitScalar =
    (elementProgress: UnitScalar): UnitScalar =>
        as.UnitScalar(as.number(use.Multiple(
            as.Scalar(as.number(elementProgress)),
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )))

const transformProgressToUseItForSecondHalf: (elementProgress: UnitScalar) => UnitScalar =
    (elementProgress: UnitScalar): UnitScalar =>
        as.UnitScalar(as.number(use.Multiple(
            use.Translation(
                elementProgress,
                CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
            ),
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )))

const computeGain: (parameters: ComputeGainParameters) => Scalar<Gain> =
    ({ existenceStyle, layerProgress, mode }: ComputeGainParameters): Scalar<Gain> => {
        const fadingGain: Scalar<Gain> = as.Scalar<Gain>(
            mode === HafuhafuMode.ZENO ?
                as.number(invertUnitScalar(layerProgress)) :
                layerProgress < HALFWAY_THROUGH ?
                    valueLinearlyBetweenValues(0, 1, transformProgressToUseItForFirstHalf(layerProgress)) :
                    valueLinearlyBetweenValues(1, 0, transformProgressToUseItForSecondHalf(layerProgress)),
        )

        return existenceStyle === ExistenceStyle.FADE ?
            fadingGain :
            computeRandomDropGain({ fadingGain, randomizingFunction: random })
    }

export {
    computeGain,
    computeRandomDropGain,
}
