import {
    as,
    Block,
    Cardinal,
    Exponent,
    Frequency,
    insteadOf,
    MULTIPLICATIVE_IDENTITY,
    negative,
    NormalScalar,
    notAs,
    ONE_FEWER,
    ONE_HALF,
    Ordinal,
    Scalar,
    use,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { ComputePitchIndexParameters, ComputePitchScalarParameters } from './types'

const computePitchIndex: (parameters: { iterationIndex: Ordinal<Block>, iterationKernel: Block }) => Ordinal =
    ({ iterationKernel, iterationIndex }: ComputePitchIndexParameters): Ordinal =>
        as.Ordinal(use.Ordinal(
            as.Cycle(iterationKernel),
            insteadOf<Ordinal, Block>(iterationIndex),
        ))

const computeDrostePitchScalarPower:
    (activeLayerCount: Cardinal<Layer[]>, layerProgress: Scalar) => Exponent =
    (activeLayerCount: Cardinal<Layer[]>, layerProgress: Scalar): Exponent => {
        const maximumAbsolutePower: Exponent = as.Exponent(notAs.Cardinal(use.Scalar(
            activeLayerCount,
            ONE_HALF,
        )))

        return valueLinearlyBetweenValues(
            negative(maximumAbsolutePower),
            maximumAbsolutePower,
            as.NormalScalar<Exponent>(notAs.Scalar(layerProgress)),
        )
    }

const computePitchScalar: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Sieve,
    stretchPitch: boolean,
}) => Scalar<Frequency> =
    ({ layerCount, layerProgress, mode, sieve, stretchPitch }: ComputePitchScalarParameters): Scalar<Frequency> => {
        if (!stretchPitch) {
            return MULTIPLICATIVE_IDENTITY
        }

        const activeLayerCount: Cardinal<Layer[]> = use.Cardinal(layerCount, ONE_FEWER)
        const layerScalar: Scalar<Scalar> = as.Scalar<Scalar>(notAs.Cardinal(activeLayerCount))
        const pitchScalarPower: Exponent = mode === HafuhafuMode.DROSTE ?
            computeDrostePitchScalarPower(activeLayerCount, layerProgress) :
            as.Exponent(notAs.Scalar(use.Scalar(layerProgress, layerScalar)))

        return as.Scalar<Frequency>(use.Exponent(
            notAs.Multiple<LayerIndex>(sieve),
            pitchScalarPower,
        ))
    }

export {
    computePitchIndex,
    computePitchScalar,
}
