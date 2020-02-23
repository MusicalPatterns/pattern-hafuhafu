import {
    as,
    Block,
    Cardinal,
    Integer,
    NormalScalar,
    Ordinal,
    quotient,
    range,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeValue } from '../element'
import { ComputeValueProgressesParameters, ComputeValueProgressParameters } from './types'

const computeValueProgress: (parameters: {
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
    totalValue: Scalar<Value>,
    valueProgress: NormalScalar<NormalScalar>,
}) => NormalScalar<NormalScalar> =
    (
        {
            iterationIndex,
            layerCount,
            mode,
            reverse,
            sieve,
            totalValue,
            totalIndices,
            valueProgress,
        }: ComputeValueProgressParameters,
    ): NormalScalar<NormalScalar> => {
        const value: Scalar<Value> =
            computeValue({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })
        const currentValueProgress: NormalScalar<NormalScalar> =
            as.NormalScalar<NormalScalar>(as.number(quotient(value, totalValue)))

        return as.NormalScalar<NormalScalar>(use.Translation(
            as.number(valueProgress),
            as.Translation(as.number(currentValueProgress)),
        ))
    }

const computeValueProgresses: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
    totalValue: Scalar<Value>,
}) => Array<NormalScalar<NormalScalar>> =
    (
        { layerCount, mode, reverse, sieve, totalValue, totalIndices }: ComputeValueProgressesParameters,
    ): Array<NormalScalar<NormalScalar>> => {
        let valueProgress: NormalScalar<NormalScalar> = as.NormalScalar<NormalScalar>(0)

        return range(totalIndices)
            .map((integer: Integer): Ordinal<Block> => as.Ordinal<Block>(integer))
            .map((iterationIndex: Ordinal<Block>): NormalScalar<NormalScalar> => {
                valueProgress = computeValueProgress({
                    iterationIndex,
                    layerCount,
                    mode,
                    reverse,
                    sieve,
                    totalIndices,
                    totalValue,
                    valueProgress,
                })

                return valueProgress
            })
    }

export {
    computeValueProgress,
    computeValueProgresses,
}
