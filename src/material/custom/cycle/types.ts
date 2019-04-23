import { Block, Cardinal } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve, SieveFractalRepetitions } from '../../../types'

interface ComputeKernelCycleParameters {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    sieveFractalRepetitions: SieveFractalRepetitions,
    sourceKernel: Block,
}

interface ComputeNextKernelParameters {
    previousKernel: Block,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}

interface ComputeTotalIndicesParameters {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    sieve: Sieve,
    sieveFractalRepetitions: SieveFractalRepetitions,
}

export {
    ComputeKernelCycleParameters,
    ComputeNextKernelParameters,
    ComputeTotalIndicesParameters,
}
