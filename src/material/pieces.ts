import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import { as, Block, Cardinal, ContourPiece, Integer, NormalScalar, Ordinal, range } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { LayerIndex } from '../types'
import { computeElement, computeLayerIndices, computeLayersProgresses, computeTotalIndices } from './custom'

const computePiece:
    (iterationKernel: Block, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGainSustainScale> =
    (iterationKernel: Block, specs: HafuhafuSpecs): ContourPiece<PitchDurationGainSustainScale> => {
        const { existenceStyle, layerCount, mode, reverse, sieve, sieveFractalRepetitions, stretchPitch } = specs

        const totalIndices: Cardinal<LayerIndex[]> =
            computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })
        const layerIndices: LayerIndex[] =
            computeLayerIndices({ layerCount, mode, reverse, sieve, totalIndices })
        const layersProgresses: NormalScalar[][] =
            computeLayersProgresses({ layerCount, mode, reverse, sieve, totalIndices })

        return as.ContourPiece<PitchDurationGainSustainScale>(
            range(totalIndices)
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
