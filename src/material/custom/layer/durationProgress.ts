import {
    as,
    Block,
    Cardinal,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    insteadOf,
    Integer,
    NormalScalar,
    notAs,
    Ordinal,
    quotient,
    Scalar,
    slice,
    Time,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
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
            as.NormalScalar<NormalScalar>(notAs.Scalar<Time>(quotient(duration, totalDuration)))

        return as.NormalScalar<NormalScalar>(use.Translation(
            notAs.NormalScalar(durationProgress),
            as.Translation(notAs.NormalScalar(currentDurationProgress)),
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
