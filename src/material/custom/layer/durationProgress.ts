import {
    apply,
    Cardinal,
    from,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    insteadOf,
    Multiple,
    NormalScalar,
    ofFrom,
    Ordinal,
    quotient,
    Scalar,
    slice,
    Time,
    to,
} from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { ComputeDurationProgressesParameters, ComputeDurationProgressParameters } from './types'

const computeDurationProgress: (parameters: {
    durationProgress: NormalScalar<NormalScalar>,
    iterationIndex: Ordinal,
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalDuration: Scalar<Time>,
    totalIndices: Cardinal,
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
            to.NormalScalar<NormalScalar>(from.Scalar<Time>(quotient(duration, totalDuration)))

        return apply.Translation(
            durationProgress,
            to.Translation(ofFrom(
                currentDurationProgress,
            )),
        )
    }

const computeDurationProgresses:
    (parameters: ComputeDurationProgressesParameters) => Array<NormalScalar<NormalScalar>> =
    (
        {
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        }: ComputeDurationProgressesParameters,
    ): Array<NormalScalar<NormalScalar>> => {
        let durationProgress: NormalScalar<NormalScalar> = to.NormalScalar<NormalScalar>(0)

        return slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            indexJustBeyondFinalElementFromElementsTotal(totalIndices),
        )
            .map(to.Ordinal)
            .map((iterationIndex: Ordinal) => {
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
