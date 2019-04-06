import {
    apply,
    Cardinal,
    from,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    Ordinal,
    Scalar,
    slice,
    Time,
    to,
} from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { LayerParameters } from './types'

const computeTotalDuration: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
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
                        to.Translation(from.Scalar<number, Scalar>(from.Time(computeDuration({
                            iterationIndex,
                            layerCount,
                            mode,
                            reverse,
                            sieve,
                            totalIndices,
                        })))),
                    ),
                to.Scalar(to.Time(0)),
            )

export {
    computeTotalDuration,
}
