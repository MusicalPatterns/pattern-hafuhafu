import { PitchValueIntensityEnvelopeScale } from '@musical-patterns/material'
import {
    as,
    Block,
    Cardinal,
    ContourElement,
    ContourPiece,
    Integer,
    NormalScalar,
    Ordinal,
    range,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { LayerIndex } from '../types'
import { computeElement, computeLayerIndices, computeLayersProgresses, computeTotalIndices } from './custom'

const computePiece:
    (iterationKernel: Block, specs: HafuhafuSpecs) => ContourPiece<PitchValueIntensityEnvelopeScale> =
    (iterationKernel: Block, specs: HafuhafuSpecs): ContourPiece<PitchValueIntensityEnvelopeScale> => {
        const { existenceStyle, layerCount, mode, reverse, sieve, sieveFractalRepetitions, stretchPitch } = specs

        const totalIndices: Cardinal<LayerIndex[]> =
            computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })
        const layerIndices: LayerIndex[] =
            computeLayerIndices({ layerCount, mode, reverse, sieve, totalIndices })
        const layersProgresses: NormalScalar[][] =
            computeLayersProgresses({ layerCount, mode, reverse, sieve, totalIndices })

        return as.ContourPiece<PitchValueIntensityEnvelopeScale>(
            range(totalIndices)
                .map((integer: Integer): Ordinal<Block> => as.Ordinal<Block>(integer))
                .map((iterationIndex: Ordinal<Block>): ContourElement<PitchValueIntensityEnvelopeScale> =>
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
