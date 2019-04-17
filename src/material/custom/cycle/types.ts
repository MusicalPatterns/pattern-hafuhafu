import { Block, Cardinal, Multiple, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'

interface ComputeKernelCycleParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Cardinal,
    sourceKernel: Block,
}

interface ComputeNextKernelParameters {
    previousKernel: Block,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal,
}

interface ComputeTotalIndicesParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Cardinal,
}

export {
    ComputeKernelCycleParameters,
    ComputeNextKernelParameters,
    ComputeTotalIndicesParameters,
}
