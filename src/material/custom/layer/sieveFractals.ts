import {
    arraySet,
    as,
    Cardinal,
    computePartialSumOfExponents,
    DECREMENT,
    INITIAL,
    Multiple,
    NEXT,
    notAs,
    Ordinal,
    repeat,
    use,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION } from './constants'
import { ComputeLayerInitialIndex } from './types'

const computeLayerInitialIndex: ComputeLayerInitialIndex =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode): Ordinal<Ordinal> =>
        mode === HafuhafuMode.DROSTE ?
            as.Ordinal<Ordinal>(computePartialSumOfExponents(
                as.Base(notAs.Multiple<Ordinal>(sieve)),
                as.Exponent(notAs.Cardinal(use.Translation(
                    layerCount,
                    DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION,
                ))),
            )) :
            INITIAL

const computeSieveFractal:
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode) => Ordinal[] =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode): Ordinal[] => {
        if (layerCount === as.Cardinal(1)) {
            return [ INITIAL ]
        }

        const lowerLayerSieveFractal: Ordinal[] = computeSieveFractal(
            sieve,
            use.Translation(layerCount, DECREMENT),
            mode,
        )
        const incrementedSieveFractal: Ordinal[] = lowerLayerSieveFractal.map(
            (sieveFractalElement: Ordinal) => use.Translation(sieveFractalElement, NEXT),
        )

        const sieveFractal: Ordinal[] = repeat(incrementedSieveFractal, as.Cardinal(notAs.Multiple<Ordinal>(sieve)))

        arraySet(sieveFractal, computeLayerInitialIndex(sieve, layerCount, mode), INITIAL)

        return sieveFractal
    }

export {
    computeSieveFractal,
}
