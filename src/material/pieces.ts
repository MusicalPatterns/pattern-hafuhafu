import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import {
    ContourPiece,
    from,
    INITIAL,
    NormalScalar,
    Ordinal,
    Scalar,
    slice,
    Time,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import {
    computeKernelIterationDurationProgress,
    computeKernelIterationTotalDuration,
    computeKernelIterationTotalIndices,
} from './custom'
import { computeKernelIterationElement } from './elements'

const computeKernelIteration: (cycleKernel: Kernel, specs: HafuhafuSpecs) => ContourPiece<PitchDurationGainSustain> =
    (cycleKernel: Kernel, specs: HafuhafuSpecs): ContourPiece<PitchDurationGainSustain> => {
        const { deletionStyle, sieveCycleRepetitions, reversed, sieve } = specs

        const kernelIterationTotalDuration: Scalar<Time> = computeKernelIterationTotalDuration({
            cycleKernel,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })
        let kernelIterationDurationProgress: NormalScalar = to.NormalScalar(0)

        return to.ContourPiece<PitchDurationGainSustain>(
            slice(
                zeroAndPositiveIntegers,
                INITIAL,
                to.Ordinal(from.Cardinal(computeKernelIterationTotalIndices({
                    cycleKernel,
                    sieve,
                    sieveCycleRepetitions,
                }))),
            )
                .map(to.Ordinal)
                .map((kernelIterationElementIndex: Ordinal) => {
                    kernelIterationDurationProgress = computeKernelIterationDurationProgress({
                        cycleKernel,
                        kernelIterationDurationProgress,
                        kernelIterationElementIndex,
                        kernelIterationTotalDuration,
                        reversed,
                        sieve,
                        sieveCycleRepetitions,
                    })

                    return computeKernelIterationElement({
                        cycleKernel,
                        deletionStyle,
                        kernelIterationDurationProgress,
                        kernelIterationElementIndex,
                        reversed,
                        sieve,
                        sieveCycleRepetitions,
                    })
                }),
        )
    }

export {
    computeKernelIteration,
}
