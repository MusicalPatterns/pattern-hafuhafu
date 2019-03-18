import {
    apply,
    Cardinal,
    from,
    invertNormalScalar,
    NormalScalar,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { computeKernelIterationTotalIndices } from './totalIndices'
import { ComputeKernelIterationIndexProgressParameters } from './types'

const computeKernelIterationIndexProgress: (parameters: ComputeKernelIterationIndexProgressParameters) => NormalScalar =
    (parameters: ComputeKernelIterationIndexProgressParameters): NormalScalar => {
        const { cycleKernel, sieve, sieveCycleRepetitions, kernelIterationElementIndex, reversed } = parameters
        const kernelIterationTotalIndices: Cardinal = computeKernelIterationTotalIndices({
            cycleKernel,
            sieve,
            sieveCycleRepetitions,
        })

        const progress: Scalar = to.Scalar(from.Ordinal(apply.Scalar(
            kernelIterationElementIndex,
            to.Scalar(from.Cardinal(reciprocal(kernelIterationTotalIndices))),
        )))

        return reversed ? invertNormalScalar(progress) : progress
    }

export {
    computeKernelIterationIndexProgress,
}
