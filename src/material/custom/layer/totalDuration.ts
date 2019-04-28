import { as, Block, Cardinal, Integer, ofNotAs, Ordinal, range, Scalar, Time, use } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from '../element'
import { LayerParameters } from './types'

const computeTotalDuration: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Scalar<Time> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Time> =>
        range(totalIndices)
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
