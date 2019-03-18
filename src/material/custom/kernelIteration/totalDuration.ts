import { apply, Cardinal, from, INITIAL, NEXT, Ordinal, Scalar, Time, to } from '@musical-patterns/utilities'
import { computeKernelIterationElementDuration } from './element'
import { computeKernelIterationTotalIndices } from './totalIndices'
import { ComputeKernelIterationTotalDurationParameters } from './types'

const computeKernelIterationTotalDuration: (parameters: ComputeKernelIterationTotalDurationParameters) => Scalar<Time> =
    (parameters: ComputeKernelIterationTotalDurationParameters): Scalar<Time> => {
        const { sieve, cycleKernel, reversed, sieveCycleRepetitions } = parameters
        let kernelIterationTotalDuration: Scalar<Time> = to.Scalar(to.Time(0))

        const kernelIterationTotalIndices: Cardinal = computeKernelIterationTotalIndices({
            cycleKernel,
            sieve,
            sieveCycleRepetitions,
        })

        for (
            let kernelIterationElementIndex: Ordinal = INITIAL;
            kernelIterationElementIndex < to.Ordinal(from.Cardinal(kernelIterationTotalIndices));
            kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
        ) {
            const kernelIterationElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
                cycleKernel,
                kernelIterationElementIndex,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            kernelIterationTotalDuration = apply.Translation(
                kernelIterationTotalDuration,
                to.Translation(from.Scalar<number, Scalar>(from.Time(kernelIterationElementDuration))),
            )
        }

        return kernelIterationTotalDuration
    }

export {
    computeKernelIterationTotalDuration,
}
