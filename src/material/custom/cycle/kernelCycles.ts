import { as, Block, Cardinal, Cycle, deepClone, deepEqual } from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve, SieveFractalRepetitions } from '../../../types'
import { computeNextKernel } from './nextKernel'
import { computeTotalIndices } from './totalIndices'
import { ComputeKernelCycleParameters } from './types'

const computeKernelCycle: (parameters: {
    layerCount: Cardinal<Layer[]>,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    sieveFractalRepetitions: SieveFractalRepetitions,
    sourceKernel: Block,
}) => Cycle<Block> =
    (
        {
            sourceKernel,
            layerCount,
            mode,
            reverse,
            sieve,
            sieveFractalRepetitions,
        }: ComputeKernelCycleParameters,
    ): Cycle<Block> => {
        const totalIndices: Cardinal<LayerIndex[]> =
            computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })

        const kernelCycle: Cycle<Block> = as.Cycle([ deepClone(sourceKernel) ])

        let nextKernel: Block = computeNextKernel({ previousKernel: sourceKernel, reverse, sieve, totalIndices })
        while (!deepEqual(sourceKernel, nextKernel)) {
            kernelCycle.push(deepClone(nextKernel))
            nextKernel = computeNextKernel({ previousKernel: nextKernel, reverse, sieve, totalIndices })
        }

        return kernelCycle
    }

export {
    computeKernelCycle,
}
