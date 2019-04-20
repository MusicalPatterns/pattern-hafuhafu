import { Block, Cardinal, Multiple, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'

interface ComputeKernelCycleParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
    sourceKernel: Block,
}

interface ComputeNextKernelParameters {
    previousKernel: Block,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal<Ordinal>,
}

interface ComputeTotalIndicesParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
}

export {
    ComputeKernelCycleParameters,
    ComputeNextKernelParameters,
    ComputeTotalIndicesParameters,
}
