import {
    as,
    Block,
    Cardinal,
    Exponent,
    insteadOf,
    MULTIPLICATIVE_IDENTITY,
    negative,
    NormalScalar,
    ONE_FEWER,
    ONE_HALF,
    Ordinal,
    Pitch,
    Scalar,
    use,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { Sieve } from '../../../types'
import { ComputePitchIndexParameters, ComputePitchScalarParameters } from './types'

const computePitchIndex:
    (parameters: { iterationIndex: Ordinal<Block>, iterationKernel: Block }) => Ordinal<Array<Scalar<Pitch>>> =
    ({ iterationKernel, iterationIndex }: ComputePitchIndexParameters): Ordinal<Array<Scalar<Pitch>>> =>
        as.Ordinal<Array<Scalar<Pitch>>>(use.Ordinal(
            as.Cycle(iterationKernel),
            insteadOf<Ordinal, Block>(iterationIndex),
        ))

const computeDrostePitchScalarPower:
    (activeLayerCount: Cardinal<Layer[]>, layerProgress: Scalar) => Exponent =
    (activeLayerCount: Cardinal<Layer[]>, layerProgress: Scalar): Exponent => {
        const maximumAbsolutePower: Exponent = as.Exponent(as.number(use.Scalar(
            activeLayerCount,
            ONE_HALF,
        )))

        return valueLinearlyBetweenValues(
            negative(maximumAbsolutePower),
            maximumAbsolutePower,
            as.NormalScalar<Exponent>(as.number(layerProgress)),
        )
    }

const computePitchScalar: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Sieve,
    stretchPitch: boolean,
}) => Scalar<Pitch> =
    ({ layerCount, layerProgress, mode, sieve, stretchPitch }: ComputePitchScalarParameters): Scalar<Pitch> => {
        if (!stretchPitch) {
            return MULTIPLICATIVE_IDENTITY
        }

        const activeLayerCount: Cardinal<Layer[]> = use.Cardinal(layerCount, ONE_FEWER)
        const layerScalar: Scalar<Scalar> = as.Scalar<Scalar>(as.number(activeLayerCount))
        const pitchScalarPower: Exponent = mode === HafuhafuMode.DROSTE ?
            computeDrostePitchScalarPower(activeLayerCount, layerProgress) :
            as.Exponent(as.number(use.Scalar(layerProgress, layerScalar)))

        return as.Scalar<Pitch>(use.Exponent(
            as.number(sieve),
            pitchScalarPower,
        ))
    }

export {
    computePitchIndex,
    computePitchScalar,
}
