import {
    Cardinal,
    from,
    INITIAL,
    Multiple,
    NormalScalar,
    Ordinal,
    Scalar,
    slice,
    Time,
    to,
    valueLinearlyBetweenValues,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
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
    sieve: Multiple<Ordinal>,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal<Ordinal>,
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

        const durationProgresses: Array<NormalScalar<NormalScalar>> = computeDurationProgresses({
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        })

        return durationProgresses.map((durationProgress: NormalScalar<NormalScalar>) =>
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
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal<Ordinal>,
}) => NormalScalar[][] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): NormalScalar[][] => {
        const totalDuration: Scalar<Time> = computeTotalDuration({ layerCount, mode, reverse, sieve, totalIndices })

        return slice(
            ZERO_AND_POSITIVE_INTEGERS,
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
