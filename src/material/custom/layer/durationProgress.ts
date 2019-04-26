import {
    as,
    Block,
    Cardinal,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    insteadOf,
    Integer,

    Ordinal,
    quotient,
    Scalar,
    slice,
    Time,
    UnitScalar,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { ComputeDurationProgressesParameters, ComputeDurationProgressParameters } from './types'

const computeDurationProgress: (parameters: {
    durationProgress: UnitScalar<UnitScalar>,
    iterationIndex: Ordinal<Block>,
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal<LayerIndex[]>,
}) => UnitScalar<UnitScalar> =
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
    ): UnitScalar<UnitScalar> => {
        const duration: Scalar<Time> =
            computeDuration({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })
        const currentDurationProgress: UnitScalar<UnitScalar> =
            as.UnitScalar<UnitScalar>(as.number(quotient(duration, totalDuration)))

        return as.UnitScalar<UnitScalar>(use.Translation(
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
}) => Array<UnitScalar<UnitScalar>> =
    (
        { layerCount, mode, reverse, sieve, totalDuration, totalIndices }: ComputeDurationProgressesParameters,
    ): Array<UnitScalar<UnitScalar>> => {
        let durationProgress: UnitScalar<UnitScalar> = as.UnitScalar<UnitScalar>(0)

        return slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            insteadOf<Ordinal, Integer[]>(indexJustBeyondFinalElementFromElementsTotal(totalIndices)),
        )
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
