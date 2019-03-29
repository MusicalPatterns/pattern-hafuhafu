import { Block, Cardinal, Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { HafuhafuMode } from '../../../spec'
import { computeNextKernel } from './nextKernel'
import { computeTotalIndices } from './totalIndices'
import { ComputeKernelCycleParameters } from './types'

const computeKernelCycle: (parameters: {
    layerCount: Cardinal,
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    sieveFractalRepetitions: Cardinal,
    sourceKernel: Block,
}) => Cycle<Block> =
    (parameters: ComputeKernelCycleParameters): Cycle<Block> => {
        const { sourceKernel, layerCount, mode, reverse, sieve, sieveFractalRepetitions } = parameters

        const totalIndices: Cardinal = computeTotalIndices({ layerCount, mode, sieve, sieveFractalRepetitions })

        const kernelCycle: Cycle<Block> = to.Cycle([ deepClone(sourceKernel) ])

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
