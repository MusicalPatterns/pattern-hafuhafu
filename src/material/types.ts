import { Cardinal, NormalScalar, Ordinal } from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../nominals'
import { DeletionStyle } from '../spec'

interface ComputeElementParameters {
    cycleKernel: Kernel,
    deletionStyle: DeletionStyle,
    kernelIterationDurationProgress: NormalScalar,
    kernelIterationElementIndex: Ordinal,
    reversed: boolean,
    sieve: Sieve,
    sieveCycleRepetitions: Cardinal,
}

export {
    ComputeElementParameters,
}
