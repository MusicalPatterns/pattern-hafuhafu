import { Block, Cardinal } from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'

interface ComputeKernelCycleParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    sieveFractalRepetitions: Cardinal,
    sourceKernel: Block,
}

interface ComputeNextKernelParameters {
    previousKernel: Block,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal,
}

interface ComputeTotalIndicesParameters {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    sieve: Sieve,
    sieveFractalRepetitions: Cardinal,
}

export {
    ComputeKernelCycleParameters,
    ComputeNextKernelParameters,
    ComputeTotalIndicesParameters,
}
