import { Amplitude, Block, Cardinal, NormalScalar, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'

interface ComputePitchIndexParameters {
    iterationIndex: Ordinal,
    iterationKernel: Block,
}

interface ComputeElementParameters {
    existenceStyle: ExistenceStyle,
    iterationIndex: Ordinal,
    iterationKernel: Block,
    layerCount: Cardinal,
    layerIndices: Ordinal[],
    layersProgresses: NormalScalar[][],
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    stretchPitch: boolean,
    totalIndices: Cardinal,
}

interface ComputePitchScalarParameters {
    layerCount: Cardinal,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Sieve,
    stretchPitch: boolean,
}

interface ComputeDurationParameters {
    iterationIndex: Ordinal,
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal,
}

interface ComputeGainParameters {
    existenceStyle: ExistenceStyle,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
}

interface ComputeElementProgressParameters {
    iterationIndex: Ordinal,
    reverse: boolean,
    totalIndices: Cardinal,
}

interface ComputeSustainParameters {
    sieve: Sieve,
}

interface ComputeLayerProgressParameters {
    iterationIndex: Ordinal,
    layerIndices: Ordinal[],
    layersProgresses: NormalScalar[][],
}

interface ComputeRandomDropGainParameters {
    fadingGain: Scalar<Amplitude>,
    randomizingFunction: (within?: number) => number
}

export {
    ComputePitchIndexParameters,
    ComputeGainParameters,
    ComputeDurationParameters,
    ComputeSustainParameters,
    ComputeElementProgressParameters,
    ComputeElementParameters,
    ComputePitchScalarParameters,
    ComputeLayerProgressParameters,
    ComputeRandomDropGainParameters,
}
