import {
    from,
    INITIAL,
    NormalScalar,
    Ordinal,
    Scalar,
    slice,
    Time,
    to,
    valueLinearlyBetweenValues,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { computeLayerBegin, computeLayerEnd } from './beginAndEnd'
import { computeDurationProgresses } from './durationProgress'
import { computeTotalDuration } from './totalDuration'
import { ComputeLayerProgressesParameters, LayerParameters } from './types'

const computeLayerProgresses: (parameters: ComputeLayerProgressesParameters) => NormalScalar[] =
    (parameters: ComputeLayerProgressesParameters): NormalScalar[] => {
        const { layerCount, layerIndex, mode, reverse, sieve, totalDuration, totalIndices } = parameters

        const begin: NormalScalar = computeLayerBegin({ layerCount, layerIndex, mode })
        const end: NormalScalar = computeLayerEnd({ layerCount, layerIndex, mode })

        const durationProgresses: NormalScalar[] = computeDurationProgresses({
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        })

        return durationProgresses.map((durationProgress: NormalScalar) =>
            valueLinearlyBetweenValues(
                reverse ? end : begin,
                reverse ? begin : end,
                durationProgress,
            ))
    }

const computeLayersProgresses: (parameters: LayerParameters) => NormalScalar[][] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): NormalScalar[][] => {
        const totalDuration: Scalar<Time> = computeTotalDuration({ layerCount, mode, reverse, sieve, totalIndices })

        return slice(
            zeroAndPositiveIntegers,
            INITIAL,
            to.Ordinal(from.Cardinal(layerCount)),
        )
            .map(to.Ordinal)
            .map((layerIndex: Ordinal) => computeLayerProgresses({
                layerCount,
                layerIndex,
                mode,
                reverse,
                sieve,
                totalDuration,
                totalIndices,
            }))
    }

export {
    computeLayersProgresses,
}
