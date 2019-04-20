import {
    apply,
    Cardinal,
    from,
    Multiple,
    NO_TRANSLATION,
    of,
    ONE_FEWER,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_ITERATION_REALIGNMENT_TRANSLATION } from '../constants'
import { ComputeTotalIndicesParameters } from './types'

const computeSieveFractalLength: (sieve: Multiple<Ordinal>, layerCount: Cardinal) => Cardinal<Ordinal> =
    (sieve: Multiple<Ordinal>, layerCount: Cardinal): Cardinal<Ordinal> =>
        to.Cardinal<Ordinal>(from.Multiple(apply.Power(
            sieve,
            to.Power<Multiple<Ordinal>>(from.Cardinal(apply.Translation(layerCount, ONE_FEWER))),
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
        apply.Multiple(
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
        apply.Translation(
            computeIterationLength(sieve, layerCount, sieveFractalRepetitions),
            mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_TRANSLATION : NO_TRANSLATION,
        )

export {
    computeTotalIndices,
}
