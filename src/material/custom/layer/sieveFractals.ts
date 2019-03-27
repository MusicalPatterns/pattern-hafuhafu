import {
    apply,
    arraySet,
    Cardinal,
    computePartialSumOfPowers,
    DECREMENT,
    FIRST,
    from,
    INCREMENT,
    INITIAL,
    Ordinal,
    repeat,
    to,
} from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION } from './constants'
import { ComputeLayerInitialIndex } from './types'

const computeLayerInitialIndex: ComputeLayerInitialIndex =
    (sieve: Sieve, layerCount: Cardinal, mode: HafuhafuMode): Ordinal =>
        mode === HafuhafuMode.DROSTE ?
            to.Ordinal(computePartialSumOfPowers(
                to.Base(hafuhafuFrom.Sieve(sieve)),
                to.Power(from.Cardinal(apply.Translation(
                    layerCount,
                    DROSTE_SIEVE_FRACTAL_LAYER_INITIAL_INDEX_COMPUTATION_PARTIAL_POWER_SUM_TRANSLATION,
                ))),
            )) :
            INITIAL

const computeSieveFractal:
    (sieve: Sieve, layerCount: Cardinal, mode: HafuhafuMode) => Ordinal[] =
    (sieve: Sieve, layerCount: Cardinal, mode: HafuhafuMode): Ordinal[] => {
        if (layerCount === FIRST) {
            return [ INITIAL ]
        }

        const lowerLayerSieveFractal: Ordinal[] = computeSieveFractal(
            sieve,
            apply.Translation(layerCount, DECREMENT),
            mode,
        )
        const incrementedSieveFractal: Ordinal[] = lowerLayerSieveFractal.map(
            (sieveFractalElement: Ordinal) => apply.Translation(sieveFractalElement, INCREMENT),
        )

        const sieveFractal: Ordinal[] = repeat(incrementedSieveFractal, to.Cardinal(hafuhafuFrom.Sieve(sieve)))

        arraySet(sieveFractal, computeLayerInitialIndex(sieve, layerCount, mode), INITIAL)

        return sieveFractal
    }

export {
    computeSieveFractal,
}
