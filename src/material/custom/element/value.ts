import {
    as,
    Block,
    Cardinal,
    INCREMENT,
    insteadOf,
    invertNormalScalar,
    NormalScalar,
    Ordinal,
    quotient,
    reciprocal,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { ComputeElementProgressParameters, ComputeValueParameters } from './types'

const computeElementProgress: (parameters: {
    iterationIndex: Ordinal<Block>,
    reverse: boolean,
    totalIndices: Cardinal<LayerIndex[]>,
}) => NormalScalar =
    ({ iterationIndex, reverse, totalIndices }: ComputeElementProgressParameters): NormalScalar => {
        const rawTotalIndices: number = as.number(totalIndices)

        if (!reverse) {
            return as.NormalScalar(quotient(as.number(iterationIndex), rawTotalIndices))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal<Block> = use.Remaindee(
            use.Cardinal(iterationIndex, INCREMENT),
            as.Remaindee<Ordinal<Block>>(rawTotalIndices),
        )

        return invertNormalScalar(as.NormalScalar(quotient(
            as.number(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
            rawTotalIndices,
        )))
    }

const computeValue: (parameters: {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Scalar<Value> =
    ({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices }: ComputeValueParameters): Scalar<Value> => {
        const elementProgress: NormalScalar = computeElementProgress({ iterationIndex, reverse, totalIndices })

        return mode === HafuhafuMode.ZENO && layerCount === as.Cardinal<Layer[]>(1) ?
            as.Scalar<Value>(1) :
            as.Scalar<Value>(use.Scalar(
                use.Exponent(
                    as.number(sieve),
                    as.Exponent(as.number(invertNormalScalar(elementProgress))),
                ),
                insteadOf<Scalar>(reciprocal(sieve)),
            ))
    }

export {
    computeValue,
    computeElementProgress,
}
