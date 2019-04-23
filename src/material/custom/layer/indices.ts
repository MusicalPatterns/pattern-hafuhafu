import {
    as,
    Block,
    Cardinal,
    Cycle,
    deepClone,
    INITIAL,
    insteadOf,
    Integer,
    NO_SHIFT,
    notAs,
    Ordinal,
    slice,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { DROSTE_ITERATION_REALIGNMENT_SHIFT } from '../constants'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
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
                as.Cycle(deepClone(sieveFractalCycle)
                    .reverse()),
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
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            as.Ordinal<Integer[]>(notAs.Cardinal(totalIndices)),
        )
            .map((integer: Integer) => as.Ordinal<Block>(integer))
            .map((iterationIndex: Ordinal<Block>) =>
                computeLayerIndex({ iterationIndex, layerCount, mode, reverse, sieve }),
            )

export {
    computeLayerIndices,
}
