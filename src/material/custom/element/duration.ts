import {
    as,
    Cardinal,
    insteadOf,
    invertNormalScalar,
    Multiple,
    NEXT,
    NormalScalar,
    notAs,
    Ordinal,
    quotient,
    reciprocal,
    Scalar,
    Time,
    use,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { ComputeDurationParameters, ComputeElementProgressParameters } from './types'

const computeElementProgress: (parameters: {
    iterationIndex: Ordinal,
    reverse: boolean,
    totalIndices: Cardinal<Ordinal>,
}) => NormalScalar =
    ({ iterationIndex, reverse, totalIndices }: ComputeElementProgressParameters): NormalScalar => {
        if (!reverse) {
            return as.NormalScalar(quotient(notAs.Ordinal(iterationIndex), notAs.Cardinal<Ordinal>(totalIndices)))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal = use.IntegerModulus(
            use.Translation(iterationIndex, NEXT),
            as.IntegerModulus<Ordinal>(notAs.Cardinal<Ordinal>(totalIndices)),
        )

        return invertNormalScalar(as.NormalScalar(quotient(
            notAs.Ordinal(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
            notAs.Cardinal<Ordinal>(totalIndices),
        )))
    }

const computeDuration: (parameters: {
    iterationIndex: Ordinal,
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal<Ordinal>,
}) => Scalar<Time> =
    ({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices }: ComputeDurationParameters): Scalar<Time> => {
        const elementProgress: NormalScalar = computeElementProgress({ iterationIndex, reverse, totalIndices })

        return mode === HafuhafuMode.ZENO && layerCount === as.Cardinal(1) ?
            as.Scalar<Time>(1) :
            as.Scalar<Time>(use.Scalar(
                use.Exponent(
                    notAs.Multiple<Ordinal>(sieve),
                    as.Exponent(notAs.NormalScalar(invertNormalScalar(elementProgress))),
                ),
                insteadOf<Scalar>(reciprocal(sieve)),
            ))
    }

export {
    computeDuration,
    computeElementProgress,
}
