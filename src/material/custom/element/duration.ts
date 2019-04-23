import {
    as,
    Block,
    Cardinal,
    INCREMENT,
    insteadOf,
    invertNormalScalar,
    NormalScalar,
    notAs,
    Ordinal,
    quotient,
    reciprocal,
    Scalar,
    Time,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { ComputeDurationParameters, ComputeElementProgressParameters } from './types'

const computeElementProgress: (parameters: {
    iterationIndex: Ordinal<Block>,
    reverse: boolean,
    totalIndices: Cardinal<LayerIndex[]>,
}) => NormalScalar =
    ({ iterationIndex, reverse, totalIndices }: ComputeElementProgressParameters): NormalScalar => {
        const rawTotalIndices: number = notAs.Cardinal<LayerIndex[]>(totalIndices)

        if (!reverse) {
            return as.NormalScalar(quotient(notAs.Ordinal(iterationIndex), rawTotalIndices))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal<Block> = use.IntegerModulus(
            use.Cardinal(iterationIndex, INCREMENT),
            as.IntegerModulus<Ordinal<Block>>(rawTotalIndices),
        )

        return invertNormalScalar(as.NormalScalar(quotient(
            notAs.Ordinal(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
            rawTotalIndices,
        )))
    }

const computeDuration: (parameters: {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Scalar<Time> =
    ({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices }: ComputeDurationParameters): Scalar<Time> => {
        const elementProgress: NormalScalar = computeElementProgress({ iterationIndex, reverse, totalIndices })

        return mode === HafuhafuMode.ZENO && layerCount === as.Cardinal<Layer[]>(1) ?
            as.Scalar<Time>(1) :
            as.Scalar<Time>(use.Scalar(
                use.Exponent(
                    notAs.Multiple<LayerIndex>(sieve),
                    as.Exponent(notAs.NormalScalar(invertNormalScalar(elementProgress))),
                ),
                insteadOf<Scalar>(reciprocal(sieve)),
            ))
    }

export {
    computeDuration,
    computeElementProgress,
}
