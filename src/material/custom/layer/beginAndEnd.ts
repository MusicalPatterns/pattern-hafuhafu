import {
    as,
    Cardinal,
    DECREMENT,
    finalIndexFromElementsTotal,
    INCREMENT,
    INITIAL,
    insteadOf,

    NormalScalar,
    Ordinal,
    reciprocal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex } from '../../../types'
import { ComputeLayerBeginAndEndParameters } from './types'

const computeLayerBegin: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar => {
        if (layerCount === as.Cardinal<Layer[]>(1)) {
            return as.NormalScalar(0)
        }

        const activeLayerCount: Cardinal = use.Cardinal(layerCount, DECREMENT)
        const layerStep: NormalScalar<Scalar> = as.NormalScalar<Scalar>(as.number(reciprocal(activeLayerCount)))

        const baseScalarFromIndex: Scalar = as.Scalar(as.number(
            mode === HafuhafuMode.DROSTE || layerIndex === insteadOf<Ordinal, Layer[]>(INITIAL) ?
                layerIndex :
                use.Cardinal(layerIndex, DECREMENT),
        ))

        return as.NormalScalar(as.number(use.NormalScalar(baseScalarFromIndex, layerStep)))
    }

const computeLayerEnd: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar =>
        layerIndex === finalIndexFromElementsTotal(layerCount) ?
            as.NormalScalar(1) :
            computeLayerBegin({ layerCount, layerIndex: use.Cardinal(layerIndex, INCREMENT), mode })

export {
    computeLayerBegin,
    computeLayerEnd,
}
