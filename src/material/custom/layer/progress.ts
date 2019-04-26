import {
    as,
    Cardinal,
    INITIAL,
    Integer,

    Scalar,
    slice,
    Time,
    UnitScalar,
    valueLinearlyBetweenValues,
    ZERO_AND_POSITIVE_INTEGERS,
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
}) => UnitScalar[] =
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
    ): UnitScalar[] => {
        const begin: UnitScalar = computeLayerBegin({ layerCount, layerIndex, mode })
        const end: UnitScalar = computeLayerEnd({ layerCount, layerIndex, mode })

        const durationProgresses: Array<UnitScalar<UnitScalar>> = computeDurationProgresses({
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        })

        return durationProgresses.map((durationProgress: UnitScalar<UnitScalar>) =>
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
}) => UnitScalar[][] =
    ({ layerCount, mode, reverse, sieve, totalIndices }: LayerParameters): UnitScalar[][] => {
        const totalDuration: Scalar<Time> = computeTotalDuration({ layerCount, mode, reverse, sieve, totalIndices })

        return slice(
            ZERO_AND_POSITIVE_INTEGERS,
            INITIAL,
            as.Ordinal<Integer[]>(as.number(layerCount)),
        )
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
