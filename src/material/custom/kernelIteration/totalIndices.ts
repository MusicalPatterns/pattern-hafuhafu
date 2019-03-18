import { Cardinal, product, to, totalElements } from '@musical-patterns/utilities'
import { from as hafuhafuFrom } from '../../../nominals'
import { ComputeKernelIterationTotalIndicesParameters } from './types'

const computeKernelIterationTotalIndices: (parameters: ComputeKernelIterationTotalIndicesParameters) => Cardinal =
    ({ sieve, sieveCycleRepetitions, cycleKernel }: ComputeKernelIterationTotalIndicesParameters): Cardinal => {
        const kernelLength: Cardinal = totalElements(cycleKernel)
        const sieveCycleLength: Cardinal = product(kernelLength, to.Cardinal(hafuhafuFrom.Sieve(sieve)))

        return product(sieveCycleLength, sieveCycleRepetitions)
    }

export {
    computeKernelIterationTotalIndices,
}
