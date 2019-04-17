import { Cardinal, Multiple, NormalScalar, Ordinal, Scalar, Time } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'

type ComputeLayerInitialIndex = (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode) => Ordinal<Ordinal>

interface LayerParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal,
}

interface ComputeDurationProgressesParameters extends LayerParameters {
    totalDuration: Scalar<Time>,
}

interface ComputeDurationProgressParameters extends ComputeDurationProgressesParameters {
    durationProgress: NormalScalar<NormalScalar>,
    iterationIndex: Ordinal,
}

interface ComputeLayerProgressesParameters extends ComputeDurationProgressesParameters {
    layerIndex: Ordinal,
}

interface ComputeLayerIndexParameters {
    iterationIndex: Ordinal,
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
}

interface ComputeLayerBeginAndEndParameters {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
}

export {
    ComputeDurationProgressesParameters,
    ComputeLayerBeginAndEndParameters,
    ComputeDurationProgressParameters,
    ComputeLayerProgressesParameters,
    LayerParameters,
    ComputeLayerIndexParameters,
    ComputeLayerInitialIndex,
}
