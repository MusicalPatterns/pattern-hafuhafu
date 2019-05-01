import { Block, Cardinal, Intensity, NormalScalar, Ordinal, Scalar } from '@musical-patterns/utilities'
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

interface ComputeValueParameters {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputeIntensityParameters {
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

interface ComputeRandomDropIntensityParameters {
    fadingIntensity: Scalar<Intensity>,
    randomizingFunction: (within?: number) => number
}

export {
    ComputePitchIndexParameters,
    ComputeIntensityParameters,
    ComputeValueParameters,
    ComputeSustainParameters,
    ComputeElementProgressParameters,
    ComputeElementParameters,
    ComputePitchScalarParameters,
    ComputeLayerProgressParameters,
    ComputeRandomDropIntensityParameters,
}
