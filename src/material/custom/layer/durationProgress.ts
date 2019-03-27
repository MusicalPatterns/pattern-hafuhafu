import {
    apply,
    from,
    INITIAL,
    NormalScalar,
    Ordinal,
    quotient,
    Scalar,
    slice,
    Time,
    to,
} from '@musical-patterns/utilities'
import { computeDuration } from '../element'
import { zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities } from '../integers'
import { ComputeDurationProgressesParameters, ComputeDurationProgressParameters } from './types'

const computeDurationProgress: (parameters: ComputeDurationProgressParameters) => NormalScalar =
    (parameters: ComputeDurationProgressParameters): NormalScalar => {
        const {
            durationProgress,
            iterationIndex,
            layerCount,
            mode,
            reverse,
            sieve,
            totalDuration,
            totalIndices,
        } = parameters

        const duration: Scalar<Time> =
            computeDuration({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })

        const currentDurationProgress: NormalScalar =
            to.NormalScalar(from.Scalar(from.Time<Scalar, Scalar<Time>>(quotient(
                duration,
                totalDuration,
            ))))

        return apply.Translation(
            durationProgress,
            to.Translation(from.NormalScalar<number, NormalScalar>(
                currentDurationProgress,
            )),
        )
    }

const computeDurationProgresses: (parameters: ComputeDurationProgressesParameters) => NormalScalar[] =
    (parameters: ComputeDurationProgressesParameters): NormalScalar[] => {
        const { layerCount, mode, reverse, sieve, totalDuration, totalIndices } = parameters
        let durationProgress: NormalScalar = to.NormalScalar(0)

        return slice(
            zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
            INITIAL,
            totalIndices,
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
