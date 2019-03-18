import { apply, Frequency, Scalar, to } from '@musical-patterns/utilities'
import { ComputeKernelIterationElementPitchParameters } from './types'

const computeKernelIterationElementPitch:
    (parameters: ComputeKernelIterationElementPitchParameters) => Scalar<Frequency> =
    ({ cycleKernel, kernelIterationElementIndex }: ComputeKernelIterationElementPitchParameters): Scalar<Frequency> =>
        to.Scalar(to.Frequency(apply.Ordinal(to.Cycle(cycleKernel), kernelIterationElementIndex)))

export {
    computeKernelIterationElementPitch,
}
