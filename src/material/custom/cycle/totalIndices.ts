import { apply, Cardinal, from, Multiple, NO_TRANSLATION, ONE_FEWER, Ordinal, to } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_ITERATION_REALIGNMENT_TRANSLATION } from '../constants'
import { ComputeTotalIndicesParameters } from './types'

const computeSieveFractalLength: (sieve: Multiple<Ordinal>, layerCount: Cardinal) => Cardinal =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal): Cardinal =>
        to.Cardinal(from.Multiple<Ordinal>(apply.Power(
            sieve,
            to.Power<Multiple<Ordinal>>(from.Cardinal(apply.Translation(layerCount, ONE_FEWER))),
        )))

const computeIterationLength:
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, sieveFractalRepetitions: Cardinal) => Cardinal =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal, sieveFractalRepetitions: Cardinal): Cardinal =>
        apply.Scalar(
            computeSieveFractalLength(sieve, layerCount),
            to.Scalar<Cardinal>(from.Cardinal(sieveFractalRepetitions)),
        )

const computeTotalIndices: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Cardinal,
}) => Cardinal =
    ({ layerCount, mode, sieve, sieveFractalRepetitions }: ComputeTotalIndicesParameters): Cardinal =>
        apply.Translation(
            computeIterationLength(sieve, layerCount, sieveFractalRepetitions),
            mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_TRANSLATION : NO_TRANSLATION,
        )

export {
    computeTotalIndices,
}
