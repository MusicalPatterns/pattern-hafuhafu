import {
    apply,
    Block,
    Cardinal,
    Exponent,
    Frequency,
    from,
    Multiple,
    MULTIPLICATIVE_IDENTITY,
    negative,
    NormalScalar,
    of,
    ONE_FEWER,
    ONE_HALF,
    Ordinal,
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
    (activeLayerCount: Cardinal, layerProgress: Scalar) => Exponent =
    (activeLayerCount: Cardinal, layerProgress: Scalar): Exponent => {
        const maximumAbsolutePower: Exponent = to.Exponent(from.Cardinal(apply.Scalar(
            activeLayerCount,
            ONE_HALF,
        )))

        return valueLinearlyBetweenValues(
            negative(maximumAbsolutePower),
            maximumAbsolutePower,
            to.NormalScalar<Exponent>(from.Scalar(layerProgress)),
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
        const layerScalar: Scalar<Scalar> = to.Scalar<Scalar>(from.Cardinal(activeLayerCount))
        const pitchScalarPower: Exponent = mode === HafuhafuMode.DROSTE ?
            computeDrostePitchScalarPower(activeLayerCount, layerProgress) :
            to.Exponent(from.Scalar(apply.Scalar(layerProgress, layerScalar)))

        return to.Scalar<Frequency>(apply.Exponent(
            from.Multiple<Ordinal>(sieve),
            pitchScalarPower,
        ))
    }

export {
    computePitchIndex,
    computePitchScalar,
}
