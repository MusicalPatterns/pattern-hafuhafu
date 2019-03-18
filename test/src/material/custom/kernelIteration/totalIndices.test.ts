import { Cardinal, to } from '@musical-patterns/utilities'
import { computeKernelIterationTotalIndices, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('kernel iteration total indices', () => {
    it('the length of the sieve cycle (kernel, times the sieve) times the sieve cycle repetitions,', () => {
        const actualKernelIterationLength: Cardinal = computeKernelIterationTotalIndices({
            cycleKernel: hafuhafuTo.Kernel([ 1, 2, 1, 1, 2 ]),
            sieve: hafuhafuTo.Sieve(7),
            sieveCycleRepetitions: to.Cardinal(4),
        })

        expect(actualKernelIterationLength)
            .toBe(to.Cardinal(140))
    })

    it('another example', () => {
        const actualKernelIterationLength: Cardinal = computeKernelIterationTotalIndices({
            cycleKernel: hafuhafuTo.Kernel([ 1, 1, 1, 2, 1, 1, 2, 2 ]),
            sieve: hafuhafuTo.Sieve(3),
            sieveCycleRepetitions: to.Cardinal(1),
        })

        expect(actualKernelIterationLength)
            .toBe(to.Cardinal(24))
    })
})
