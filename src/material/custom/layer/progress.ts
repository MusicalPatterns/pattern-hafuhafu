import {
    as,
    Cardinal,
    Integer,
    NormalScalar,
    Ordinal,
    range,
    Scalar,
    Value,
    valueLinearlyBetweenValues,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeLayerBegin, computeLayerEnd } from './beginAndEnd'
import { computeTotalValue } from './totalValue'
import { ComputeLayerProgressesParameters, LayerParameters } from './types'
import { computeValueProgresses } from './valueProgress'

const computeLayerProgresses: (parameters: {
    layerCount: Cardinal<Layer[]>,
    layerIndex: LayerIndex,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
    totalValue: Scalar<Value>,
}) => NormalScalar[] =
    (
        {
            layerCount,
            layerIndex,
            mode,
            reverse,
            sieve,
            totalValue,
            totalIndices,
        }: ComputeLayerProgressesParameters,
    ): NormalScalar[] => {
        const begin: NormalScalar = computeLayerBegin({ layerCount, layerIndex, mode })
        const end: NormalScalar = computeLayerEnd({ layerCount, layerIndex, mode })

        const valueProgresses: Array<NormalScalar<NormalScalar>> = computeValueProgresses({
            layerCount,
            mode,
            reverse,
            sieve,
            totalIndices,
            totalValue,
        })

        return valueProgresses.map((valueProgress: NormalScalar<NormalScalar>): NormalScalar =>
            valueLinearlyBetweenValues(
                reverse ? end : begin,
                reverse ? begin : end,
                valueProgress,
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
        const totalValue: Scalar<Value> = computeTotalValue({ layerCount, mode, reverse, sieve, totalIndices })

        return range(layerCount)
            .map((integer: Integer): Ordinal<Layer[]> => as.Ordinal<Layer[]>(integer))
            .map((layerIndex: LayerIndex): NormalScalar[] => computeLayerProgresses({
                layerCount,
                layerIndex,
                mode,
                reverse,
                sieve,
                totalIndices,
                totalValue,
            }))
    }

export {
    computeLayersProgresses,
}
