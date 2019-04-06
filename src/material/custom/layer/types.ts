import { Cardinal, NormalScalar, Ordinal, Scalar, Time } from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'

type ComputeLayerInitialIndex = (sieve: Sieve, layerCount: Cardinal, mode: HafuhafuMode) => Ordinal

interface LayerParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal,
}

interface ComputeDurationProgressesParameters extends LayerParameters {
    totalDuration: Scalar<Time>,
}

interface ComputeDurationProgressParameters extends ComputeDurationProgressesParameters {
    durationProgress: NormalScalar,
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
    sieve: Sieve,
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
