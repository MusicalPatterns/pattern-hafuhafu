import {
    arraySet,
    as,
    Cardinal,
    computePartialSumOfExponents,
    DECREMENT,
    INITIAL,
    NEXT,
    Ordinal,
    repeat,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_SHIFT } from './constants'

const computeLayerInitialIndex:
    (sieve: Sieve, layerCount: Cardinal<Layer[]>, mode: HafuhafuMode) => Ordinal<LayerIndex[]> =
    (sieve: Sieve, layerCount: Cardinal<Layer[]>, mode: HafuhafuMode): Ordinal<LayerIndex[]> =>
        mode === HafuhafuMode.DROSTE ?
            as.Ordinal<LayerIndex[]>(computePartialSumOfExponents(
                as.Base(as.number(sieve)),
                as.Exponent(as.number(use.Cardinal(
                    layerCount,
                    DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_SHIFT,
                ))),
            )) :
            INITIAL

const computeSieveFractal:
    (sieve: Sieve, layerCount: Cardinal<Layer[]>, mode: HafuhafuMode) => LayerIndex[] =
    (sieve: Sieve, layerCount: Cardinal<Layer[]>, mode: HafuhafuMode): LayerIndex[] => {
        if (layerCount === as.Cardinal<Layer[]>(1)) {
            return [ INITIAL ]
        }

        const lowerLayerSieveFractal: LayerIndex[] = computeSieveFractal(
            sieve,
            use.Cardinal(layerCount, DECREMENT),
            mode,
        )
        const incrementedSieveFractal: LayerIndex[] = lowerLayerSieveFractal.map(
            (sieveFractalElement: LayerIndex): LayerIndex => use.Cardinal(sieveFractalElement, NEXT),
        )

        const sieveFractal: LayerIndex[] = repeat(
            incrementedSieveFractal,
            as.Cardinal<LayerIndex[]>(as.number(sieve)),
        )

        arraySet(sieveFractal, computeLayerInitialIndex(sieve, layerCount, mode), INITIAL)

        return sieveFractal
    }

export {
    computeSieveFractal,
}
