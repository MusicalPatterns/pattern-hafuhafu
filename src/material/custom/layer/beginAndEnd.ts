import {
    as,
    Cardinal,
    DECREMENT,
    finalIndexFromElementsTotal,
    INCREMENT,
    INITIAL,
    insteadOf,

    Ordinal,
    reciprocal,
    Scalar,
    UnitScalar,
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
}) => UnitScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): UnitScalar => {
        if (layerCount === as.Cardinal<Layer[]>(1)) {
            return as.UnitScalar(0)
        }

        const activeLayerCount: Cardinal = use.Cardinal(layerCount, DECREMENT)
        const layerStep: UnitScalar<Scalar> = as.UnitScalar<Scalar>(as.number(reciprocal(activeLayerCount)))

        const baseScalarFromIndex: Scalar = as.Scalar(as.number(
            mode === HafuhafuMode.DROSTE || layerIndex === insteadOf<Ordinal, Layer[]>(INITIAL) ?
                layerIndex :
                use.Cardinal(layerIndex, DECREMENT),
        ))

        return as.UnitScalar(as.number(use.UnitScalar(baseScalarFromIndex, layerStep)))
    }

const computeLayerEnd: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
}) => UnitScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): UnitScalar =>
        layerIndex === finalIndexFromElementsTotal(layerCount) ?
            as.UnitScalar(1) :
            computeLayerBegin({ layerCount, layerIndex: use.Cardinal(layerIndex, INCREMENT), mode })

export {
    computeLayerBegin,
    computeLayerEnd,
}
