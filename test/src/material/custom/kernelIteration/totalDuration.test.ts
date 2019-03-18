import { Scalar, sum, testIsCloseTo, Time, to } from '@musical-patterns/utilities'
import { computeKernelIterationTotalDuration, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('kernel iteration total duration', () => {
    it('sums the durations of every kernel iteration element', () => {
        const actualKernelIterationTotalDuration: Scalar<Time> = computeKernelIterationTotalDuration({
            cycleKernel: hafuhafuTo.Kernel([ 0, 1, 1 ]),
            reversed: false,
            sieve: hafuhafuTo.Sieve(2),
            sieveCycleRepetitions: to.Cardinal(2),
        })

        testIsCloseTo(
            actualKernelIterationTotalDuration,
            to.Scalar(to.Time(sum(
                1,
                0.9438743126816934, // Sieve repetition
                0.8908987181403393, // Kernel repetition
                0.8408964152537145, // Sieve repetition
                0.7937005259840998,
                0.7491535384383408, // Sieve repetition & kernel repetition (1st of 2 sieve cycles)
                0.7071067811865476,
                0.6674199270850172, // Sieve repetition
                0.6299605249474366, // Kernel repetition
                0.5946035575013605, // Sieve repetition
                0.5612310241546865,
                0.5297315471796477, // Sieve repetition & kernel repetition (2nd of 2 sieve cycles = kernel iteration)
            ))),
        )
    })
})
