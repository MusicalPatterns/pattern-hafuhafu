import {
    as,
    Block,
    Cardinal,
    INCREMENT,
    insteadOf,
    invertUnitScalar,

    Ordinal,
    quotient,
    reciprocal,
    Scalar,
    Time,
    UnitScalar,
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
}) => UnitScalar =
    ({ iterationIndex, reverse, totalIndices }: ComputeElementProgressParameters): UnitScalar => {
        const rawTotalIndices: number = as.number(totalIndices)

        if (!reverse) {
            return as.UnitScalar(quotient(as.number(iterationIndex), rawTotalIndices))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal<Block> = use.IntegerModulus(
            use.Cardinal(iterationIndex, INCREMENT),
            as.IntegerModulus<Ordinal<Block>>(rawTotalIndices),
        )

        return invertUnitScalar(as.UnitScalar(quotient(
            as.number(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
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
        const elementProgress: UnitScalar = computeElementProgress({ iterationIndex, reverse, totalIndices })

        return mode === HafuhafuMode.ZENO && layerCount === as.Cardinal<Layer[]>(1) ?
            as.Scalar<Time>(1) :
            as.Scalar<Time>(use.Scalar(
                use.Exponent(
                    as.number(sieve),
                    as.Exponent(as.number(invertUnitScalar(elementProgress))),
                ),
                insteadOf<Scalar>(reciprocal(sieve)),
            ))
    }

export {
    computeDuration,
    computeElementProgress,
}
