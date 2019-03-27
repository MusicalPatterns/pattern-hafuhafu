import { apply, from, INITIAL, Ordinal, Scalar, slice, Time, to } from '@musical-patterns/utilities'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { LayerParameters } from './types'

const computeTotalDuration: (parameters: LayerParameters) => Scalar<Time> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Time> =>
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            totalIndices,
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
