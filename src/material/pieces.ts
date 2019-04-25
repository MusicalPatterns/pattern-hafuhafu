import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import {
    as,
    Block,
    Cardinal,
    ContourPiece,
    INITIAL,
    Integer,
    notAs,
    Ordinal,
    slice,
    UnitScalar,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { LayerIndex } from '../types'
import {
    computeElement,
    computeLayerIndices,
    computeLayersProgresses,
    computeTotalIndices,
    zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
} from './custom'

const computePiece:
    (iterationKernel: Block, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGainSustainScale> =
    (iterationKernel: Block, specs: HafuhafuSpecs): ContourPiece<PitchDurationGainSustainScale> => {
        const { existenceStyle, layerCount, mode, reverse, sieve, sieveFractalRepetitions, stretchPitch } = specs

        const totalIndices: Cardinal<LayerIndex[]> =
            computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })
        const layerIndices: LayerIndex[] =
            computeLayerIndices({ layerCount, mode, reverse, sieve, totalIndices })
        const layersProgresses: UnitScalar[][] =
            computeLayersProgresses({ layerCount, mode, reverse, sieve, totalIndices })

        return as.ContourPiece<PitchDurationGainSustainScale>(
            slice(
                zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
                INITIAL,
                as.Ordinal<Integer[]>(notAs.Cardinal(totalIndices)),
            )
                .map((integer: Integer) => as.Ordinal<Block>(integer))
                .map((iterationIndex: Ordinal<Block>) =>
                    computeElement({
                        existenceStyle,
                        iterationIndex,
                        iterationKernel,
                        layerCount,
                        layerIndices,
                        layersProgresses,
                        mode,
                        reverse,
                        sieve,
                        stretchPitch,
                        totalIndices,
                    }),
                ),
        )
    }

export {
    computePiece,
}
