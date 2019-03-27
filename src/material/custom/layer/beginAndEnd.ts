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
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { ComputeLayerBeginAndEndParameters } from './types'

const computeLayerBegin: (parameters: ComputeLayerBeginAndEndParameters) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar => {
        const activeLayerCount: Cardinal = apply.Translation(layerCount, ONE_FEWER)
        const layerStep: NormalScalar = to.NormalScalar(from.Cardinal(reciprocal(activeLayerCount)))

        const index: Ordinal = mode === HafuhafuMode.DROSTE || layerIndex === INITIAL ?
            layerIndex :
            apply.Translation(layerIndex, PREVIOUS)

        return apply.Scalar(index, layerStep)
    }

const computeLayerEnd: (parameters: ComputeLayerBeginAndEndParameters) => NormalScalar =
    ({ layerCount, layerIndex, mode }: ComputeLayerBeginAndEndParameters): NormalScalar =>
        layerIndex === finalIndexFromElementsTotal(layerCount) ?
            to.NormalScalar(1) :
            computeLayerBegin({ layerCount, layerIndex: apply.Translation(layerIndex, NEXT), mode })

export {
    computeLayerBegin,
    computeLayerEnd,
}
