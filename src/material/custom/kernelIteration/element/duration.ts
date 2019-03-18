import {
    apply,
    from,
    invertNormalScalar,
    NormalScalar,
    reciprocal,
    Scalar,
    Time,
    to,
} from '@musical-patterns/utilities'
import { from as hafuhafuFrom } from '../../../../nominals'
import { computeKernelIterationIndexProgress } from '../indexProgress'
import { ComputeKernelIterationElementDurationParameters } from './types'

const computeKernelIterationElementDuration:
    (parameters: ComputeKernelIterationElementDurationParameters) => Scalar<Time> =
    (parameters: ComputeKernelIterationElementDurationParameters): Scalar<Time> => {
        const { cycleKernel, kernelIterationElementIndex, reversed, sieveCycleRepetitions, sieve } = parameters

        const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
            cycleKernel,
            kernelIterationElementIndex,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })

        return to.Scalar(to.Time(hafuhafuFrom.Sieve(apply.Scalar(
            apply.Power(
                sieve,
                to.Power(from.NormalScalar<number, NormalScalar>(invertNormalScalar(kernelIterationIndexProgress))),
            ),
            to.Scalar(hafuhafuFrom.Sieve(reciprocal(sieve))),
        ))))
    }

export {
    computeKernelIterationElementDuration,
}
