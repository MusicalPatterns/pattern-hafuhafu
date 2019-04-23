import {
    as,
    Block,
    Cardinal,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    insteadOf,
    Integer,
    ofNotAs,
    Ordinal,
    Scalar,
    slice,
    Time,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { LayerParameters } from './types'

const computeTotalDuration: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Scalar<Time> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Time> =>
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            insteadOf<Ordinal, Integer[]>(indexJustBeyondFinalElementFromElementsTotal(totalIndices)),
        )
            .map((integer: Integer) => as.Ordinal<Block>(integer))
            .reduce(
                (totalDuration: Scalar<Time>, iterationIndex: Ordinal<Block>) =>
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
