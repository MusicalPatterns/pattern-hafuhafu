import {
    apply,
    Cardinal,
    from,
    invertNormalScalar,
    Multiple,
    NEXT,
    NormalScalar,
    of,
    ofFrom,
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
    totalIndices: Cardinal,
}) => NormalScalar =
    ({ iterationIndex, reverse, totalIndices }: ComputeElementProgressParameters): NormalScalar => {
        if (!reverse) {
            return to.NormalScalar(quotient(from.Ordinal(iterationIndex), from.Cardinal(totalIndices)))
        }

        const indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote: Ordinal = apply.Modulus(
            apply.Translation(iterationIndex, NEXT),
            to.Modulus<Ordinal>(from.Cardinal(totalIndices)),
        )

        return invertNormalScalar(to.NormalScalar(quotient(
            from.Ordinal(indexReassignedToChangeOwnershipOfIntervalWithNeighboringNote),
            from.Cardinal(totalIndices),
        )))
    }

const computeDuration: (parameters: {
    iterationIndex: Ordinal,
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal,
}) => Scalar<Time> =
    ({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices }: ComputeDurationParameters): Scalar<Time> => {
        const elementProgress: NormalScalar = computeElementProgress({ iterationIndex, reverse, totalIndices })

        return mode === HafuhafuMode.ZENO && layerCount === to.Cardinal(1) ?
            to.Scalar<Time>(1) :
            to.Scalar(of.Time(from.Multiple<Ordinal>(apply.Scalar(
                apply.Power(
                    sieve,
                    to.Power<Multiple<Ordinal>>(from.NormalScalar(
                        invertNormalScalar(elementProgress),
                    )),
                ),
                to.Scalar(ofFrom(reciprocal(sieve))),
            ))))
    }

export {
    computeDuration,
    computeElementProgress,
}
