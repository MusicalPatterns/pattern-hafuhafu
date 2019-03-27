import { FULL_GAIN, SILENT } from '@musical-patterns/pattern'
import {
    Amplitude,
    apply,
    from,
    invertNormalScalar,
    NormalScalar,
    random,
    Scalar,
    to,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import {
    CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
    DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
    HALFWAY_THROUGH,
} from './constants'
import { ComputeGainParameters, ComputeRandomDropGainParameters } from './types'

const computeRandomDropGain: (parameters: ComputeRandomDropGainParameters) => Scalar<Amplitude> =
    ({ fadingGain, randomizingFunction }: ComputeRandomDropGainParameters): Scalar<Amplitude> =>
        randomizingFunction() < from.Scalar(from.Amplitude<Scalar, Scalar<Amplitude>>(fadingGain)) ?
            FULL_GAIN :
            SILENT

const transformProgressToUseItForFirstHalf: (elementProgress: NormalScalar) => NormalScalar =
    (elementProgress: NormalScalar): NormalScalar =>
        apply.Scalar(
            elementProgress,
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )

const transformProgressToUseItForSecondHalf: (elementProgress: NormalScalar) => NormalScalar =
    (elementProgress: NormalScalar): NormalScalar =>
        apply.Scalar(
            apply.Translation(
                elementProgress,
                CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
            ),
            DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
        )

const computeGain: (parameters: ComputeGainParameters) => Scalar<Amplitude> =
    ({ existenceStyle, layerProgress, mode }: ComputeGainParameters): Scalar<Amplitude> => {
        const fadingGain: Scalar<Amplitude> = to.Scalar(to.Amplitude(
            mode === HafuhafuMode.ZENO ?
                from.NormalScalar(invertNormalScalar(layerProgress)) :
                layerProgress < HALFWAY_THROUGH ?
                    valueLinearlyBetweenValues(0, 1, transformProgressToUseItForFirstHalf(layerProgress)) :
                    valueLinearlyBetweenValues(1, 0, transformProgressToUseItForSecondHalf(layerProgress)),
        ))

        return existenceStyle === ExistenceStyle.FADE ?
            fadingGain :
            computeRandomDropGain({ fadingGain, randomizingFunction: random })
    }

export {
    computeGain,
    computeRandomDropGain,
}
