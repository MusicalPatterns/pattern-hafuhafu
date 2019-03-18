import {
    apply,
    Cardinal,
    difference,
    from,
    INITIAL,
    isUndefined,
    Maybe,
    NEXT,
    NormalScalar,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { computeKernelIterationIndexProgress, Kernel, Sieve, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('kernel iteration index progress', () => {
    let cycleKernel: Kernel
    let sieve: Sieve
    let sieveCycleRepetitions: Cardinal
    let reversed: boolean

    const ARBITRARY_BUT_VERY_LOW_NUMBER: number = 0.02
    const FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8: Ordinal = to.Ordinal(79)

    beforeEach(() => {
        cycleKernel = hafuhafuTo.Kernel([ 1, 2, 1, 1, 2 ])
        sieve = hafuhafuTo.Sieve(2)
        sieveCycleRepetitions = to.Cardinal(8)
        reversed = false
    })

    it('the first element in the kernel iteration has kernel iteration index progress 0', () => {
        const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
            cycleKernel,
            kernelIterationElementIndex: INITIAL,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })

        expect(kernelIterationIndexProgress)
            .toBe(to.NormalScalar(0))
    })

    it('the final element in the kernel iteration almost has kernel iteration index progress 1 (the next one would be 1)', () => {
        const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
            cycleKernel,
            kernelIterationElementIndex: FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })

        expect(from.NormalScalar(kernelIterationIndexProgress))
            .toBeGreaterThan(1 - ARBITRARY_BUT_VERY_LOW_NUMBER)
    })

    it('each kernel iteration index progress result is greater than the one before it', () => {
        let previousKernelIterationIndexProgress: Maybe<NormalScalar> = undefined
        for (
            let kernelIterationElementIndex: Ordinal = INITIAL;
            kernelIterationElementIndex <= FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8;
            kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
        ) {
            const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                cycleKernel,
                kernelIterationElementIndex,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            if (!isUndefined(previousKernelIterationIndexProgress)) {
                expect(from.NormalScalar(kernelIterationIndexProgress))
                    .toBeGreaterThan(from.NormalScalar(previousKernelIterationIndexProgress))
            }

            previousKernelIterationIndexProgress = kernelIterationIndexProgress
        }
    })

    describe('when reverse is true, the kernel iteration index progress instead counts down from 1 to 0', () => {
        beforeEach(() => {
            reversed = true
        })

        it('the first element in the kernel iteration has kernel iteration index progress 1', () => {
            const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                cycleKernel,
                kernelIterationElementIndex: INITIAL,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(kernelIterationIndexProgress)
                .toBe(to.NormalScalar(1))
        })

        it('the final element in the kernel iteration almost has kernel iteration index progress 0 (the next one would be 0)', () => {
            const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                cycleKernel,
                kernelIterationElementIndex: FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(from.NormalScalar(kernelIterationIndexProgress))
                .toBeLessThan(ARBITRARY_BUT_VERY_LOW_NUMBER)
        })

        it('each kernel iteration index progress result is less than the one before it', () => {
            let previousKernelIterationIndexProgress: Maybe<NormalScalar> = undefined
            for (
                let kernelIterationElementIndex: Ordinal = INITIAL;
                kernelIterationElementIndex <= FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8;
                kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
            ) {
                const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                    cycleKernel,
                    kernelIterationElementIndex,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                if (!isUndefined(previousKernelIterationIndexProgress)) {
                    expect(from.NormalScalar(kernelIterationIndexProgress))
                        .toBeLessThan(from.NormalScalar(previousKernelIterationIndexProgress))
                }

                previousKernelIterationIndexProgress = kernelIterationIndexProgress
            }
        })

        it('each next kernel iteration index progress result increments by the same amount', () => {
            let previousKernelIterationIndexProgress: Maybe<NormalScalar> = undefined
            let previousKernelIterationIndexProgressDifference: Maybe<NormalScalar> = undefined
            for (
                let kernelIterationElementIndex: Ordinal = INITIAL;
                kernelIterationElementIndex <= FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8;
                kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
            ) {
                const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                    cycleKernel,
                    kernelIterationElementIndex,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                if (!isUndefined(previousKernelIterationIndexProgress)) {
                    let kernelIterationIndexProgressDifference: Maybe<NormalScalar>
                    if (!isUndefined(previousKernelIterationIndexProgressDifference)) {
                        kernelIterationIndexProgressDifference = difference(
                            kernelIterationIndexProgress,
                            previousKernelIterationIndexProgress,
                        )
                        expect(kernelIterationIndexProgressDifference)
                            .toEqual(previousKernelIterationIndexProgressDifference)
                    }
                    previousKernelIterationIndexProgressDifference = kernelIterationIndexProgressDifference
                }

                previousKernelIterationIndexProgress = kernelIterationIndexProgress
            }
        })
    })

    describe('when sieve is other than 2', () => {
        const FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_3_AND_SIEVE_CYCLE_REPETITIONS_8: Ordinal = to.Ordinal(119)

        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(3)
        })

        it('the first element in the kernel iteration has kernel iteration index progress 0', () => {
            const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                cycleKernel,
                kernelIterationElementIndex: INITIAL,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(kernelIterationIndexProgress)
                .toBe(to.NormalScalar(0))
        })

        it('the final element in the kernel iteration almost has kernel iteration index progress 1 (the next one would be 1)', () => {
            const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                cycleKernel,
                kernelIterationElementIndex: FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_3_AND_SIEVE_CYCLE_REPETITIONS_8,
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(from.NormalScalar(kernelIterationIndexProgress))
                .toBeGreaterThan(1 - ARBITRARY_BUT_VERY_LOW_NUMBER)
        })

        it('each kernel iteration index progress result is greater than the one before it', () => {
            let previousKernelIterationIndexProgress: Maybe<NormalScalar> = undefined
            for (
                let kernelIterationElementIndex: Ordinal = INITIAL;
                kernelIterationElementIndex <= FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_3_AND_SIEVE_CYCLE_REPETITIONS_8;
                kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
            ) {
                const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                    cycleKernel,
                    kernelIterationElementIndex,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                if (!isUndefined(previousKernelIterationIndexProgress)) {
                    expect(from.NormalScalar(kernelIterationIndexProgress))
                        .toBeGreaterThan(from.NormalScalar(previousKernelIterationIndexProgress))
                }

                previousKernelIterationIndexProgress = kernelIterationIndexProgress
            }
        })

        it('each next kernel iteration index progress result increments by the same amount', () => {
            let previousKernelIterationIndexProgress: Maybe<NormalScalar> = undefined
            let previousKernelIterationIndexProgressDifference: Maybe<NormalScalar> = undefined
            for (
                let kernelIterationElementIndex: Ordinal = INITIAL;
                kernelIterationElementIndex <= FINAL_KERNEL_ITERATION_ELEMENT_INDEX_WHEN_CYCLE_LENGTH_5_SIEVE_2_AND_SIEVE_CYCLE_REPETITIONS_8;
                kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
            ) {
                const kernelIterationIndexProgress: NormalScalar = computeKernelIterationIndexProgress({
                    cycleKernel,
                    kernelIterationElementIndex,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                if (!isUndefined(previousKernelIterationIndexProgress)) {
                    let kernelIterationIndexProgressDifference: Maybe<NormalScalar>
                    if (!isUndefined(previousKernelIterationIndexProgressDifference)) {
                        kernelIterationIndexProgressDifference = difference(
                            kernelIterationIndexProgress,
                            previousKernelIterationIndexProgress,
                        )
                        expect(kernelIterationIndexProgressDifference)
                            .toEqual(previousKernelIterationIndexProgressDifference)
                    }
                    previousKernelIterationIndexProgressDifference = kernelIterationIndexProgressDifference
                }

                previousKernelIterationIndexProgress = kernelIterationIndexProgress
            }
        })
    })
})
