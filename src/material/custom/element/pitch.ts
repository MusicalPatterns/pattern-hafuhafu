import {
    apply,
    Block,
    Cardinal,
    Frequency,
    from,
    insteadOf,
    Multiple,
    MULTIPLICATIVE_IDENTITY,
    negative,
    NormalScalar,
    of,
    ONE_FEWER,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    to,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { ComputePitchIndexParameters, ComputePitchScalarParameters } from './types'

const computePitchIndex: (parameters: { iterationIndex: Ordinal, iterationKernel: Block }) => Ordinal =
    ({ iterationKernel, iterationIndex }: ComputePitchIndexParameters): Ordinal =>
        to.Ordinal(apply.Ordinal(
            to.Cycle(iterationKernel),
            iterationIndex,
        ))

const computeDrostePitchScalarPower:
    (activeLayerCount: Cardinal, layerProgress: NormalScalar) => Power<Multiple<Ordinal>> =
    (activeLayerCount: Cardinal, layerProgress: NormalScalar): Power<Multiple<Ordinal>> => {
        const maximumAbsolutePower: Power<Multiple<Ordinal>> = to.Power<Multiple<Ordinal>>(from.Cardinal(apply.Scalar(
            activeLayerCount,
            ONE_HALF,
        )))

        return valueLinearlyBetweenValues(
            negative(maximumAbsolutePower),
            maximumAbsolutePower,
            insteadOf<NormalScalar, Power<Multiple<Ordinal>>>(layerProgress),
        )
    }

const computePitchScalar: (parameters: {
    layerCount: Cardinal,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Multiple<Ordinal>,
    stretchPitch: boolean,
}) => Scalar<Frequency> =
    ({ layerCount, layerProgress, mode, sieve, stretchPitch }: ComputePitchScalarParameters): Scalar<Frequency> => {
        if (!stretchPitch) {
            return MULTIPLICATIVE_IDENTITY
        }

        const activeLayerCount: Cardinal = apply.Translation(layerCount, ONE_FEWER)
        const layerScalar: Scalar<NormalScalar> = to.Scalar<NormalScalar>(from.Cardinal(activeLayerCount))
        const pitchScalarPower: Power<Multiple<Ordinal>> = mode === HafuhafuMode.DROSTE ?
            computeDrostePitchScalarPower(activeLayerCount, layerProgress) :
            to.Power<Multiple<Ordinal>>(from.NormalScalar(apply.Scalar(layerProgress, layerScalar)))

        return to.Scalar(of.Frequency(from.Multiple<Ordinal>(apply.Power(
            sieve,
            pitchScalarPower,
        ))))
    }

export {
    computePitchIndex,
    computePitchScalar,
}
