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
    Time,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from '../element'
import { ComputeDurationProgressesParameters, ComputeDurationProgressParameters } from './types'

const computeDurationProgress: (parameters: {
    durationProgress: NormalScalar<NormalScalar>,
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal<LayerIndex[]>,
}) => NormalScalar<NormalScalar> =
    (
        {
            durationProgress,
            iterationIndex,
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        }: ComputeDurationProgressParameters,
    ): NormalScalar<NormalScalar> => {
        const duration: Scalar<Time> =
            computeDuration({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })
        const currentDurationProgress: NormalScalar<NormalScalar> =
            as.NormalScalar<NormalScalar>(as.number(quotient(duration, totalDuration)))

        return as.NormalScalar<NormalScalar>(use.Translation(
            as.number(durationProgress),
            as.Translation(as.number(currentDurationProgress)),
        ))
    }

const computeDurationProgresses: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Array<NormalScalar<NormalScalar>> =
    (
        { layerCount, mode, reverse, sieve, totalDuration, totalIndices }: ComputeDurationProgressesParameters,
    ): Array<NormalScalar<NormalScalar>> => {
        let durationProgress: NormalScalar<NormalScalar> = as.NormalScalar<NormalScalar>(0)

        return range(totalIndices)
            .map((integer: Integer) => as.Ordinal<Block>(integer))
            .map((iterationIndex: Ordinal<Block>) => {
                durationProgress = computeDurationProgress({
                    durationProgress,
                    iterationIndex,
                    layerCount,
                    mode,
                    reverse,
                    sieve,
                    totalDuration,
                    totalIndices,
                })

                return durationProgress
            })
    }

export {
    computeDurationProgress,
    computeDurationProgresses,
}
