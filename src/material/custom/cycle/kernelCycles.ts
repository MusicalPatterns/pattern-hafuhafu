import { as, Block, Cardinal, Cycle, deepClone, deepEqual, Multiple, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuMode } from '../../../spec'
import { computeNextKernel } from './nextKernel'
import { computeTotalIndices } from './totalIndices'
import { ComputeKernelCycleParameters } from './types'

const computeKernelCycle: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    sieveFractalRepetitions: Multiple<Cardinal<Ordinal>>,
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
        const totalIndices: Cardinal<Ordinal> =
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
