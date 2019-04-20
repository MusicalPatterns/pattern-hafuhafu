import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import {
    Block,
    Cardinal,
    ContourPiece,
    from,
    INITIAL,
    NormalScalar,
    Ordinal,
    slice,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import {
    computeElement,
    computeLayerIndices,
    computeLayersProgresses,
    computeTotalIndices,
    zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
} from './custom'

const computePieces:
    (iterationKernel: Block, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGainSustainScale> =
    (iterationKernel: Block, specs: HafuhafuSpecs): ContourPiece<PitchDurationGainSustainScale> => {
        const { existenceStyle, layerCount, mode, reverse, sieve, sieveFractalRepetitions, stretchPitch } = specs

        const totalIndices: Cardinal<Ordinal> =
            computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })
        const layerIndices: Ordinal[] = computeLayerIndices({ layerCount, mode, reverse, sieve, totalIndices })
        const layersProgresses: NormalScalar[][] =
            computeLayersProgresses({ layerCount, mode, reverse, sieve, totalIndices })

        return to.ContourPiece<PitchDurationGainSustainScale>(
            slice(
                zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
                INITIAL,
                to.Ordinal(from.Cardinal(totalIndices)),
            )
                .map(to.Ordinal)
                .map((iterationIndex: Ordinal) =>
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
    computePieces,
}
