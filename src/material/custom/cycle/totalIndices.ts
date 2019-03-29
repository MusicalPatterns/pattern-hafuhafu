import { apply, Cardinal, from, NO_TRANSLATION, ONE_FEWER, to } from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_ITERATION_REALIGNMENT_TRANSLATION } from '../constants'
import { ComputeTotalIndicesParameters } from './types'

const computeSieveFractalLength: (sieve: Sieve, layerCount: Cardinal) => Cardinal =
    (sieve: Sieve, layerCount: Cardinal): Cardinal =>
        to.Cardinal(hafuhafuFrom.Sieve(apply.Power(
            sieve,
            to.Power(from.Cardinal(apply.Translation(layerCount, ONE_FEWER))),
        )))

const computeIterationLength: (sieve: Sieve, layerCount: Cardinal, sieveFractalRepetitions: Cardinal) => Cardinal =
    (sieve: Sieve, layerCount: Cardinal, sieveFractalRepetitions: Cardinal): Cardinal =>
        apply.Scalar(
            computeSieveFractalLength(sieve, layerCount),
            to.Scalar(from.Cardinal(sieveFractalRepetitions)),
        )

const computeTotalIndices: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Sieve,
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
