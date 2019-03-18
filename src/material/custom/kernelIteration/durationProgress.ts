import { apply, from, NormalScalar, quotient, Scalar, Time, to } from '@musical-patterns/utilities'
import { computeKernelIterationElementDuration } from './element'
import { ComputeKernelIterationDurationProgressParameters } from './types'

const computeKernelIterationDurationProgress:
    (parameters: ComputeKernelIterationDurationProgressParameters) => NormalScalar =
    (parameters: ComputeKernelIterationDurationProgressParameters): NormalScalar => {
        const {
            cycleKernel,
            kernelIterationDurationProgress,
            kernelIterationElementIndex,
            kernelIterationTotalDuration,
            reversed,
            sieve,
            sieveCycleRepetitions,
        } = parameters

        const kernelIterationElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
            cycleKernel,
            kernelIterationElementIndex,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })

        const kernelIterationElementDurationProgress: NormalScalar =
            to.NormalScalar(from.Scalar(from.Time<Scalar, Scalar<Time>>(quotient(
                kernelIterationElementDuration,
                kernelIterationTotalDuration,
            ))))

        return apply.Translation(
            kernelIterationDurationProgress,
            to.Translation(from.NormalScalar<number, NormalScalar>(
                kernelIterationElementDurationProgress,
            )),
        )
    }

export {
    computeKernelIterationDurationProgress,
}
