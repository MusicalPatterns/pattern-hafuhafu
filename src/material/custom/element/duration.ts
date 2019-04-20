import {
    apply,
    Cardinal,
    from,
    insteadOf,
    invertNormalScalar,
    Multiple,
    NEXT,
    NormalScalar,
    Ordinal,
    quotient,
    reciprocal,
    Scalar,
    Time,
    to,
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
            return to.NormalScalar(quotient(from.Ordinal(iterationIndex), from.Cardinal<Ordinal>(totalIndices)))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal = apply.IntegerModulus(
            apply.Translation(iterationIndex, NEXT),
            to.IntegerModulus<Ordinal>(from.Cardinal<Ordinal>(totalIndices)),
        )

        return invertNormalScalar(to.NormalScalar(quotient(
            from.Ordinal(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
            from.Cardinal<Ordinal>(totalIndices),
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

        return mode === HafuhafuMode.ZENO && layerCount === to.Cardinal(1) ?
            to.Scalar<Time>(1) :
            to.Scalar<Time>(apply.Scalar(
                apply.Exponent(
                    from.Multiple<Ordinal>(sieve),
                    to.Exponent(from.NormalScalar(invertNormalScalar(elementProgress))),
                ),
                insteadOf<Scalar>(reciprocal(sieve)),
            ))
    }

export {
    computeDuration,
    computeElementProgress,
}
