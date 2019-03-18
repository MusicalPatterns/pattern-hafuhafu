import { Cardinal, NormalScalar, Ordinal } from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../../../../nominals'
import { DeletionStyle } from '../../../../spec'

interface ComputeKernelIterationElementGainParameters {
    deletionStyle: DeletionStyle,
    kernelIterationDurationProgress: NormalScalar,
    kernelIterationElementIndex: Ordinal,
    reversed: boolean,
    sieve: Sieve,
}

interface ComputeKernelIterationElementDurationParameters {
    cycleKernel: Kernel,
    kernelIterationElementIndex: Ordinal,
    reversed: boolean,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

interface ComputeKernelIterationElementSustainParameters {
    sieve: Sieve,
}

interface ComputeKernelIterationElementPitchParameters {
    cycleKernel: Kernel,
    kernelIterationElementIndex: Ordinal,
}

export {
    ComputeKernelIterationElementDurationParameters,
    ComputeKernelIterationElementGainParameters,
    ComputeKernelIterationElementSustainParameters,
    ComputeKernelIterationElementPitchParameters,
}
