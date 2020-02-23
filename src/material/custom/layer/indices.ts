import {
    as,
    Block,
    Cardinal,
    computeReverse,
    Cycle,
    insteadOf,
    Integer,
    NO_SHIFT,
    Ordinal,
    range,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { DROSTE_ITERATION_REALIGNMENT_SHIFT } from '../constants'
import { computeSieveFractal } from './sieveFractals'
import { ComputeLayerIndexParameters, LayerParameters } from './types'

const computeLayerIndex: (parameters: {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
}) => LayerIndex =
    ({ layerCount, mode, reverse, sieve, iterationIndex }: ComputeLayerIndexParameters): LayerIndex => {
        const sieveFractalCycle: Cycle<LayerIndex> = as.Cycle(computeSieveFractal(sieve, layerCount, mode))

        const maybeReversedSieveFractalCycle: Cycle<LayerIndex> = reverse ?
            use.Cardinal(
                as.Cycle<LayerIndex>(computeReverse(sieveFractalCycle)),
                mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_SHIFT : NO_SHIFT,
            ) :
            sieveFractalCycle

        return use.Ordinal(maybeReversedSieveFractalCycle, insteadOf<Ordinal, Cycle<LayerIndex>>(iterationIndex))
    }

const computeLayerIndices: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => LayerIndex[] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): LayerIndex[] =>
        range(totalIndices)
            .map((integer: Integer): Ordinal<Block> => as.Ordinal<Block>(integer))
            .map((iterationIndex: Ordinal<Block>): LayerIndex =>
                computeLayerIndex({ iterationIndex, layerCount, mode, reverse, sieve }),
            )

export {
    computeLayerIndices,
}
