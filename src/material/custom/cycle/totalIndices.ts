import { as, Cardinal, Multiple, NO_TRANSLATION, notAs, ONE_FEWER, Ordinal, use } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_ITERATION_REALIGNMENT_TRANSLATION } from '../constants'
import { ComputeTotalIndicesParameters } from './types'

const computeSieveFractalLength: (sieve: Multiple<Ordinal>, layerCount: Cardinal) => Cardinal<Ordinal> =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal): Cardinal<Ordinal> =>
        as.Cardinal<Ordinal>(notAs.Multiple(use.Power(
            sieve,
            as.Power<Multiple<Ordinal>>(notAs.Cardinal(use.Translation(layerCount, ONE_FEWER))),
        )))

const computeIterationLength: (
    sieve: Multiple<Ordinal>,
    layerCount: Cardinal,
    sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
) => Cardinal<Ordinal> =
    (
        sieve: Multiple<Ordinal>,
        layerCount: Cardinal,
        sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
    ): Cardinal<Ordinal> =>
        use.Multiple(
            computeSieveFractalLength(sieve, layerCount),
            sieveFractalRepetitions,
        )

const computeTotalIndices: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
}) => Cardinal<Ordinal> =
    ({ layerCount, mode, sieve, sieveFractalRepetitions }: ComputeTotalIndicesParameters): Cardinal<Ordinal> =>
        use.Translation(
            computeIterationLength(sieve, layerCount, sieveFractalRepetitions),
            mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_TRANSLATION : NO_TRANSLATION,
        )

export {
    computeTotalIndices,
}
