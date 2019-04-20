import {
    as,
    Cardinal,
    finalIndexFromElementsTotal,
    INITIAL,
    NEXT,
    NormalScalar,
    notAs,
    ONE_FEWER,
    Ordinal,
    PREVIOUS,
    reciprocal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { ComputeLayerBeginAndEndParameters } from './types'

const computeLayerBegin: (parameters: {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar => {
        if (layerCount === as.Cardinal(1)) {
            return as.NormalScalar(0)
        }

        const activeLayerCount: Cardinal = use.Translation(layerCount, ONE_FEWER)
        const layerStep: NormalScalar<Scalar> = as.NormalScalar<Scalar>(reciprocal(activeLayerCount))

        const baseScalarFromIndex: Scalar = as.Scalar(notAs.Ordinal(
            mode === HafuhafuMode.DROSTE || layerIndex === INITIAL ?
                layerIndex :
                use.Translation(layerIndex, PREVIOUS),
        ))

        return as.NormalScalar(notAs.Scalar(use.NormalScalar(baseScalarFromIndex, layerStep)))
    }

const computeLayerEnd: (parameters: {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar =>
        layerIndex === finalIndexFromElementsTotal(layerCount) ?
            as.NormalScalar(1) :
            computeLayerBegin({ layerCount, layerIndex: use.Translation(layerIndex, NEXT), mode })

export {
    computeLayerBegin,
    computeLayerEnd,
}
