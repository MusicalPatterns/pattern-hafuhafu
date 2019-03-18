import { Cardinal, NormalScalar, Ordinal, Scalar, Time } from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../../../nominals'

interface ComputeKernelIterationIndexProgressParameters {
    cycleKernel: Kernel,
    kernelIterationElementIndex: Ordinal,
    reversed: boolean,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

interface ComputeKernelIterationTotalIndicesParameters {
    cycleKernel: Kernel,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

interface ComputeKernelIterationTotalDurationParameters {
    cycleKernel: Kernel,
    reversed: boolean,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

interface ComputeKernelIterationDurationProgressParameters {
    cycleKernel: Kernel,
    kernelIterationDurationProgress: NormalScalar,
    kernelIterationElementIndex: Ordinal,
    kernelIterationTotalDuration: Scalar<Time>,
    reversed: boolean,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

export {
    ComputeKernelIterationIndexProgressParameters,
    ComputeKernelIterationTotalIndicesParameters,
    ComputeKernelIterationDurationProgressParameters,
    ComputeKernelIterationTotalDurationParameters,
}
