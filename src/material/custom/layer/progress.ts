import {
    Cardinal,
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
import { Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { computeLayerBegin, computeLayerEnd } from './beginAndEnd'
import { computeDurationProgresses } from './durationProgress'
import { computeTotalDuration } from './totalDuration'
import { ComputeLayerProgressesParameters, LayerParameters } from './types'

const computeLayerProgresses: (parameters: {
    layerCount: Cardinal,
    layerIndex: Ordinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal,
}) => NormalScalar[] =
    (
        {
            layerCount,
            layerIndex,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        }: ComputeLayerProgressesParameters,
    ): NormalScalar[] => {
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

const computeLayersProgresses: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal,
}) => NormalScalar[][] =
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
