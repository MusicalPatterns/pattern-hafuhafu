import { Cardinal, NormalScalar, Ordinal, Scalar, Time, to } from '@musical-patterns/utilities'
import {
    computeKernelIterationDurationProgress,
    Kernel,
    Sieve,
    to as hafuhafuTo,
} from '../../../../../src/indexForTest'

describe('kernel iteration duration progress', () => {
    it('takes the existing kernel iteration duration progress and adds to it the progress from the next kernel iteration element', () => {
        const previousKernelIterationDurationProgress: NormalScalar = to.NormalScalar(0)

        const FOR_SIMPLICITY_TESTING_THE_FIRST_KERNEL_ITERATION_ELEMENT: Ordinal = to.Ordinal(0)
        const ARBITRARY_TOTAL_DURATION_FOR_ASSERTION: Scalar<Time> = to.Scalar(to.Time(88.888))

        const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE: Sieve = hafuhafuTo.Sieve(999)
        const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE_CYCLE_REPETITIONS: Cardinal = to.Cardinal(999)
        const IRRELEVANT_FOR_THESE_PURPOSES_KERNEL: Kernel = hafuhafuTo.Kernel([ 0 ])

        const actualKernelIterationDurationProgress: NormalScalar = computeKernelIterationDurationProgress({
            cycleKernel: IRRELEVANT_FOR_THESE_PURPOSES_KERNEL,
            kernelIterationDurationProgress: previousKernelIterationDurationProgress,
            kernelIterationElementIndex: FOR_SIMPLICITY_TESTING_THE_FIRST_KERNEL_ITERATION_ELEMENT,
            kernelIterationTotalDuration: ARBITRARY_TOTAL_DURATION_FOR_ASSERTION,
            reversed: false,
            sieve: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE,
            sieveCycleRepetitions: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE_CYCLE_REPETITIONS,
        })

        const THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER: NormalScalar =
            to.NormalScalar(1 / 88.888)
        expect(actualKernelIterationDurationProgress)
            .toEqual(THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER)
    })

    it('when reversed', () => {
        const previousKernelIterationDurationProgress: NormalScalar = to.NormalScalar(0)

        const FOR_SIMPLICITY_TESTING_THE_FIRST_KERNEL_ITERATION_ELEMENT: Ordinal = to.Ordinal(0)
        const ARBITRARY_TOTAL_DURATION_FOR_ASSERTION: Scalar<Time> = to.Scalar(to.Time(88.888))
        const ARBITRARY_SIEVE_FOR_ASSERTION: Sieve = hafuhafuTo.Sieve(3)

        const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE_CYCLE_REPETITIONS: Cardinal = to.Cardinal(999)
        const IRRELEVANT_FOR_THESE_PURPOSES_KERNEL: Kernel = hafuhafuTo.Kernel([ 0 ])

        const actualKernelIterationDurationProgress: NormalScalar = computeKernelIterationDurationProgress({
            cycleKernel: IRRELEVANT_FOR_THESE_PURPOSES_KERNEL,
            kernelIterationDurationProgress: previousKernelIterationDurationProgress,
            kernelIterationElementIndex: FOR_SIMPLICITY_TESTING_THE_FIRST_KERNEL_ITERATION_ELEMENT,
            kernelIterationTotalDuration: ARBITRARY_TOTAL_DURATION_FOR_ASSERTION,
            reversed: true,
            sieve: ARBITRARY_SIEVE_FOR_ASSERTION,
            sieveCycleRepetitions: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE_CYCLE_REPETITIONS,
        })

        const THE_FIRST_ELEMENT_HAS_DURATION_1_OVER_SIEVE_SO_PROGRESS_IS_SIMPLY_THAT_MUCH_INTO_THE_TOTAL_NEEDED_TO_COVER: NormalScalar =
            to.NormalScalar((1 / 3) / 88.888)
        expect(actualKernelIterationDurationProgress)
            .toEqual(THE_FIRST_ELEMENT_HAS_DURATION_1_OVER_SIEVE_SO_PROGRESS_IS_SIMPLY_THAT_MUCH_INTO_THE_TOTAL_NEEDED_TO_COVER)
    })
})
