import { as, Cardinal, DECREMENT, NO_SHIFT, notAs, use } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve, SieveFractalRepetitions } from '../../../types'
import { DROSTE_ITERATION_REALIGNMENT_SHIFT } from '../constants'
import { ComputeTotalIndicesParameters } from './types'

const computeSieveFractalLength: (sieve: Sieve, layerCount: Cardinal<Layer[]>) => Cardinal<LayerIndex[]> =
    (sieve: Sieve, layerCount: Cardinal<Layer[]>): Cardinal<LayerIndex[]> =>
        as.Cardinal<LayerIndex[]>(notAs.Multiple(use.Power(
            sieve,
            as.Power<Sieve>(notAs.Cardinal(use.Cardinal(layerCount, DECREMENT))),
        )))

const computeIterationLength: (
    sieve: Sieve,
    layerCount: Cardinal<Layer[]>,
    sieveFractalRepetitions: SieveFractalRepetitions,
) => Cardinal<LayerIndex[]> =
    (
        sieve: Sieve,
        layerCount: Cardinal<Layer[]>,
        sieveFractalRepetitions: SieveFractalRepetitions,
    ): Cardinal<LayerIndex[]> =>
        use.Multiple(
            computeSieveFractalLength(sieve, layerCount),
            sieveFractalRepetitions,
        )

const computeTotalIndices: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    sieve: Sieve,
    sieveFractalRepetitions: SieveFractalRepetitions,
}) => Cardinal<LayerIndex[]> =
    ({ layerCount, mode, sieve, sieveFractalRepetitions }: ComputeTotalIndicesParameters): Cardinal<LayerIndex[]> =>
        use.Cardinal(
            computeIterationLength(sieve, layerCount, sieveFractalRepetitions),
            mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_SHIFT : NO_SHIFT,
        )

export {
    computeTotalIndices,
}
