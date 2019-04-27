import { Block, Cardinal, NormalScalar, Ordinal, Scalar, Time } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'

interface LayerParameters {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputeDurationProgressesParameters extends LayerParameters {
    totalDuration: Scalar<Time>,
}

interface ComputeDurationProgressParameters extends ComputeDurationProgressesParameters {
    durationProgress: NormalScalar<NormalScalar>,
    iterationIndex: Ordinal<Block>,
}

interface ComputeLayerProgressesParameters extends ComputeDurationProgressesParameters {
    layerIndex: LayerIndex,
}

interface ComputeLayerIndexParameters {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
}

interface ComputeLayerBeginAndEndParameters {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
}

export {
    ComputeDurationProgressesParameters,
    ComputeLayerBeginAndEndParameters,
    ComputeDurationProgressParameters,
    ComputeLayerProgressesParameters,
    LayerParameters,
    ComputeLayerIndexParameters,
}
