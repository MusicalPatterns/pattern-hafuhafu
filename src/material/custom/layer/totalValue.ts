import { as, Block, Cardinal, Integer, ofNotAs, Ordinal, range, Scalar, use, Value } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeValue } from '../element'
import { LayerParameters } from './types'

const computeTotalValue: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Scalar<Value> =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Scalar<Value> =>
        range(totalIndices)
            .map((integer: Integer) => as.Ordinal<Block>(integer))
            .reduce(
                (totalValue: Scalar<Value>, iterationIndex: Ordinal<Block>) =>
                    use.Translation(
                        totalValue,
                        as.Translation(ofNotAs(computeValue({
                            iterationIndex,
                            layerCount,
                            mode,
                            reverse,
                            sieve,
                            totalIndices,
                        }))),
                    ),
                as.Scalar<Value>(0),
            )

export {
    computeTotalValue,
}
