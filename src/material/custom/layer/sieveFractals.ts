import {
    apply,
    arraySet,
    Cardinal,
    computePartialSumOfExponents,
    DECREMENT,
    from,
    INITIAL,
    Multiple,
    NEXT,
    Ordinal,
    repeat,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION } from './constants'
import { ComputeLayerInitialIndex } from './types'

const computeLayerInitialIndex: ComputeLayerInitialIndex =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode): Ordinal<Ordinal> =>
        mode === HafuhafuMode.DROSTE ?
            to.Ordinal<Ordinal>(computePartialSumOfExponents(
                to.Base(from.Multiple<Ordinal>(sieve)),
                to.Exponent(from.Cardinal(apply.Translation(
                    layerCount,
                    DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION,
                ))),
            )) :
            INITIAL

const computeSieveFractal:
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode) => Ordinal[] =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, mode: HafuhafuMode): Ordinal[] => {
        if (layerCount === to.Cardinal(1)) {
            return [ INITIAL ]
        }

        const lowerLayerSieveFractal: Ordinal[] = computeSieveFractal(
            sieve,
            apply.Translation(layerCount, DECREMENT),
            mode,
        )
        const incrementedSieveFractal: Ordinal[] = lowerLayerSieveFractal.map(
            (sieveFractalElement: Ordinal) => apply.Translation(sieveFractalElement, NEXT),
        )

        const sieveFractal: Ordinal[] = repeat(incrementedSieveFractal, to.Cardinal(from.Multiple<Ordinal>(sieve)))

        arraySet(sieveFractal, computeLayerInitialIndex(sieve, layerCount, mode), INITIAL)

        return sieveFractal
    }

export {
    computeSieveFractal,
}
