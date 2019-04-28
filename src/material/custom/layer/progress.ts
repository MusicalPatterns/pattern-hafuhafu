import {
    as,
    Cardinal,
    Integer,
    NormalScalar,
    range,
    Scalar,
    Time,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeLayerBegin, computeLayerEnd } from './beginAndEnd'
import { computeDurationProgresses } from './durationProgress'
import { computeTotalDuration } from './totalDuration'
import { ComputeLayerProgressesParameters, LayerParameters } from './types'

const computeLayerProgresses: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal<LayerIndex[]>,
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
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => NormalScalar[][] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): NormalScalar[][] => {
        const totalDuration: Scalar<Time> = computeTotalDuration({ layerCount, mode, reverse, sieve, totalIndices })

        return range(layerCount)
            .map((integer: Integer) => as.Ordinal<Layer[]>(integer))
            .map((layerIndex: LayerIndex) => computeLayerProgresses({
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
