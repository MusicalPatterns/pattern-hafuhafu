import {
    apply,
    Cardinal,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    Multiple,
    ofFrom,
    Ordinal,
    Scalar,
    slice,
    Time,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { LayerParameters } from './types'

const computeTotalDuration: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal,
}) => Scalar<Time> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Time> =>
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            indexJustBeyondFinalElementFromElementsTotal(totalIndices),
        )
            .map(to.Ordinal)
            .reduce(
                (totalDuration: Scalar<Time>, iterationIndex: Ordinal) =>
                    apply.Translation(
                        totalDuration,
                        to.Translation(ofFrom(computeDuration({
                            iterationIndex,
                            layerCount,
                            mode,
                            reverse,
                            sieve,
                            totalIndices,
                        }))),
                    ),
                to.Scalar<Time>(0),
            )

export {
    computeTotalDuration,
}
