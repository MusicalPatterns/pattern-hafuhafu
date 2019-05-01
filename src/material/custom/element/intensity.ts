import { FULL_GAIN, SILENT } from '@musical-patterns/material'
import {
    as,
    Intensity,
    invertNormalScalar,
    NormalScalar,
    random,
    Scalar,
    use,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import {
    CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
    DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
    HALFWAY_THROUGH,
} from './constants'
import { ComputeIntensityParameters, ComputeRandomDropIntensityParameters } from './types'

const computeRandomDropIntensity: (parameters: {
    fadingIntensity: Scalar<Intensity>,
    randomizingFunction: (within?: number) => number,
}) => Scalar<Intensity> =
    ({ fadingIntensity, randomizingFunction }: ComputeRandomDropIntensityParameters): Scalar<Intensity> =>
        randomizingFunction() < as.number(fadingIntensity) ?
            FULL_GAIN :
            SILENT

const transformProgressToUseItForFirstHalf: (elementProgress: NormalScalar) => NormalScalar =
    (elementProgress: NormalScalar): NormalScalar =>
        as.NormalScalar(as.number(use.Multiple(
            as.Scalar(as.number(elementProgress)),
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )))

const transformProgressToUseItForSecondHalf: (elementProgress: NormalScalar) => NormalScalar =
    (elementProgress: NormalScalar): NormalScalar =>
        as.NormalScalar(as.number(use.Multiple(
            use.Translation(
                elementProgress,
                CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
            ),
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )))

const computeIntensity: (parameters: ComputeIntensityParameters) => Scalar<Intensity> =
    ({ existenceStyle, layerProgress, mode }: ComputeIntensityParameters): Scalar<Intensity> => {
        const fadingIntensity: Scalar<Intensity> = as.Scalar<Intensity>(
            mode === HafuhafuMode.ZENO ?
                as.number(invertNormalScalar(layerProgress)) :
                layerProgress < HALFWAY_THROUGH ?
                    valueLinearlyBetweenValues(0, 1, transformProgressToUseItForFirstHalf(layerProgress)) :
                    valueLinearlyBetweenValues(1, 0, transformProgressToUseItForSecondHalf(layerProgress)),
        )

        return existenceStyle === ExistenceStyle.FADE ?
            fadingIntensity :
            computeRandomDropIntensity({ fadingIntensity, randomizingFunction: random })
    }

export {
    computeIntensity,
    computeRandomDropIntensity,
}
