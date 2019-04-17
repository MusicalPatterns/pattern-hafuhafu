import {
    apply,
    Cardinal,
    finalIndexFromElementsTotal,
    from,
    INITIAL,
    NEXT,
    NormalScalar,
    ONE_FEWER,
    Ordinal,
    PREVIOUS,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { ComputeLayerBeginAndEndParameters } from './types'

const computeLayerBegin: (parameters: {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar => {
        if (layerCount === to.Cardinal(1)) {
            return to.NormalScalar(0)
        }

        const activeLayerCount: Cardinal = apply.Translation(layerCount, ONE_FEWER)
        const layerStep: NormalScalar<Scalar> = to.NormalScalar<Scalar>(from.Cardinal(reciprocal(activeLayerCount)))

        const baseScalarFromIndex: Scalar = to.Scalar(from.Ordinal(
            mode === HafuhafuMode.DROSTE || layerIndex === INITIAL ?
                layerIndex :
                apply.Translation(layerIndex, PREVIOUS),
        ))

        return to.NormalScalar(from.Scalar(apply.NormalScalar(baseScalarFromIndex, layerStep)))
    }

const computeLayerEnd: (parameters: {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
}) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar =>
        layerIndex === finalIndexFromElementsTotal(layerCount) ?
            to.NormalScalar(1) :
            computeLayerBegin({ layerCount, layerIndex: apply.Translation(layerIndex, NEXT), mode })

export {
    computeLayerBegin,
    computeLayerEnd,
}
