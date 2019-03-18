import { to } from '@musical-patterns/utilities'
import { computeKernelIterationElementPitch, Kernel, to as hafuhafuTo } from '../../../../../../src/indexForTest'

describe('kernel iteration element pitch', () => {
    it('takes the pitch from the cycle kernel at the kernel iteration element index, wrapping around if it exceeds the end', () => {
        const cycleKernel: Kernel = hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ])

        expect(computeKernelIterationElementPitch({ cycleKernel, kernelIterationElementIndex: to.Ordinal(2) }))
            .toBe(to.Scalar(to.Frequency(1)))

        expect(computeKernelIterationElementPitch({ cycleKernel, kernelIterationElementIndex: to.Ordinal(3) }))
            .toBe(to.Scalar(to.Frequency(0)))

        expect(computeKernelIterationElementPitch({ cycleKernel, kernelIterationElementIndex: to.Ordinal(99) }))
            .toBe(to.Scalar(to.Frequency(1)))
    })
})
