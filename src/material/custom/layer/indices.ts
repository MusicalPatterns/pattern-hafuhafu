import {
    apply,
    Cycle,
    deepClone,
    from,
    INITIAL,
    NO_TRANSLATION,
    Ordinal,
    slice,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { DROSTE_ITERATION_REALIGNMENT_TRANSLATION } from '../constants'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { computeSieveFractal } from './sieveFractals'
import { ComputeLayerIndexParameters, LayerParameters } from './types'

const computeLayerIndex: (parameters: ComputeLayerIndexParameters) => Ordinal =
    ({ layerCount, mode, reverse, sieve, iterationIndex }: ComputeLayerIndexParameters): Ordinal => {
        const sieveFractalCycle: Cycle<Ordinal> = to.Cycle(computeSieveFractal(sieve, layerCount, mode))

        const maybeReversedSieveFractalCycle: Cycle<Ordinal> = reverse ?
            apply.Translation(
                to.Cycle(deepClone(sieveFractalCycle)
                    .reverse()),
                mode === HafuhafuMode.DROSTE ? DROSTE_ITERATION_REALIGNMENT_TRANSLATION : NO_TRANSLATION,
            ) :
            sieveFractalCycle

        return apply.Ordinal(maybeReversedSieveFractalCycle, iterationIndex)
    }

const computeLayerIndices: (parameters: LayerParameters) => Ordinal[] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): Ordinal[] =>
        slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            to.Ordinal(from.Cardinal(totalIndices)),
        )
            .map(to.Ordinal)
            .map((iterationIndex: Ordinal) =>
                computeLayerIndex({ iterationIndex, layerCount, mode, reverse, sieve }),
            )

export {
    computeLayerIndices,
}
