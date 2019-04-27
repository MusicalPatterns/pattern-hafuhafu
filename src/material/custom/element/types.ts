import { Block, Cardinal, Gain, NormalScalar, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'

interface ComputePitchIndexParameters {
    iterationIndex: Ordinal<Block>,
    iterationKernel: Block,
}

interface ComputeElementParameters {
    existenceStyle: ExistenceStyle,
    iterationIndex: Ordinal<Block>,
    iterationKernel: Block,
    layerCount: Cardinal<Layer[]>,
    layerIndices: LayerIndex[],
    layersProgresses: NormalScalar[][],
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    stretchPitch: boolean,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputePitchScalarParameters {
    layerCount: Cardinal<Layer[]>,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
    sieve: Sieve,
    stretchPitch: boolean,
}

interface ComputeDurationParameters {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputeGainParameters {
    existenceStyle: ExistenceStyle,
    layerProgress: NormalScalar,
    mode: HafuhafuMode,
}

interface ComputeElementProgressParameters {
    iterationIndex: Ordinal<Block>,
    reverse: boolean,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputeSustainParameters {
    sieve: Sieve,
}

interface ComputeLayerProgressParameters {
    iterationIndex: Ordinal<Block>,
    layerIndices: LayerIndex[],
    layersProgresses: NormalScalar[][],
}

interface ComputeRandomDropGainParameters {
    fadingGain: Scalar<Gain>,
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
