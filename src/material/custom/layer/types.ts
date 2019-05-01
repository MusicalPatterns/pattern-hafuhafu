import { Block, Cardinal, NormalScalar, Ordinal, Scalar, Value } from '@musical-patterns/utilities'
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

interface ComputeValueProgressesParameters extends LayerParameters {
    totalValue: Scalar<Value>,
}

interface ComputeValueProgressParameters extends ComputeValueProgressesParameters {
    iterationIndex: Ordinal<Block>,
    valueProgress: NormalScalar<NormalScalar>,
}

interface ComputeLayerProgressesParameters extends ComputeValueProgressesParameters {
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
    ComputeValueProgressesParameters,
    ComputeLayerBeginAndEndParameters,
    ComputeValueProgressParameters,
    ComputeLayerProgressesParameters,
    LayerParameters,
    ComputeLayerIndexParameters,
}
