import {
    apply,
    Block,
    Cardinal,
    Frequency,
    from,
    MULTIPLICATIVE_IDENTITY,
    negative,
    NormalScalar,
    ONE_FEWER,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    to,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { ComputePitchIndexParameters, ComputePitchScalarParameters } from './types'

const computePitchIndex: (parameters: { iterationIndex: Ordinal, iterationKernel: Block }) => Ordinal =
    ({ iterationKernel, iterationIndex }: ComputePitchIndexParameters): Ordinal =>
        to.Ordinal(apply.Ordinal(
            to.Cycle(iterationKernel),
            iterationIndex,
        ))

const computeDrostePitchScalarPower: (activeLayerCount: Cardinal, layerProgress: NormalScalar) => Power =
    (activeLayerCount: Cardinal, layerProgress: NormalScalar): Power => {
        const maximumAbsolutePower: Power = to.Power(from.Cardinal(apply.Scalar(
            activeLayerCount,
            ONE_HALF,
        )))

        return valueLinearlyBetweenValues(
            negative(maximumAbsolutePower),
            maximumAbsolutePower,
            layerProgress,
        )
    }

const computePitchScalar: (parameters: {
    layerCount: Cardinal,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Sieve,
    stretchPitch: boolean,
}) => Scalar<Frequency> =
    ({ layerCount, layerProgress, mode, sieve, stretchPitch }: ComputePitchScalarParameters): Scalar<Frequency> => {
        if (!stretchPitch) {
            return to.Frequency(MULTIPLICATIVE_IDENTITY)
        }

        const activeLayerCount: Cardinal = apply.Translation(layerCount, ONE_FEWER)
        const layerScalar: Scalar = to.Scalar(from.Cardinal(activeLayerCount))
        const pitchScalarPower: Power = mode === HafuhafuMode.DROSTE ?
            computeDrostePitchScalarPower(activeLayerCount, layerProgress) :
            to.Power(from.NormalScalar<number, Scalar>(apply.Scalar(layerProgress, layerScalar)))

        return to.Scalar(to.Frequency(hafuhafuFrom.Sieve(apply.Power(
            sieve,
            pitchScalarPower,
        ))))
    }

export {
    computePitchIndex,
    computePitchScalar,
}
