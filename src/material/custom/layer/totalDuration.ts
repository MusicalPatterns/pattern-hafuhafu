import {
    as,
    Cardinal,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    Multiple,
    ofNotAs,
    Ordinal,
    Scalar,
    slice,
    Time,
    use,
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
    totalIndices: Cardinal<Ordinal>,
}) => Scalar<Time> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Time> =>
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            indexJustBeyondFinalElementFromElementsTotal(totalIndices),
        )
            .map(as.Ordinal)
            .reduce(
                (totalDuration: Scalar<Time>, iterationIndex: Ordinal) =>
                    use.Translation(
                        totalDuration,
                        as.Translation(ofNotAs(computeDuration({
                            iterationIndex,
                            layerCount,
                            mode,
                            reverse,
                            sieve,
                            totalIndices,
                        }))),
                    ),
                as.Scalar<Time>(0),
            )

export {
    computeTotalDuration,
}
