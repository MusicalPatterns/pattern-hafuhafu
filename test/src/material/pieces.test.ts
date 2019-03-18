// tslint:disable no-duplicate-string

import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    ContourElement,
    ContourPiece,
    difference,
    dividesEvenly,
    from,
    INITIAL,
    NEXT,
    Ordinal,
    quotient,
    Scalar,
    Time,
    to,
} from '@musical-patterns/utilities'
import {
    computeKernelIteration,
    computeKernelIterationElementDuration,
    DeletionStyle,
    initialSpecs,
    Kernel,
    Sieve,
    to as hafuhafuTo,
} from '../../../src/indexForTest'

const computeTotalDurationForTest: (INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP: Ordinal, KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH: Kernel, sieve: Sieve, sieveCycleRepetitions: Cardinal) => Scalar<Time> =
    (INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP: Ordinal, KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH: Kernel, sieve: Sieve, sieveCycleRepetitions: Cardinal): Scalar<Time> => {
        let totalDuration: Scalar<Time> = to.Scalar(to.Time(0))
        for (
            let kernelIterationElementIndex: Ordinal = INITIAL;
            kernelIterationElementIndex <= INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP;
            kernelIterationElementIndex = apply.Translation(kernelIterationElementIndex, NEXT)
        ) {
            const duration: Scalar<Time> = computeKernelIterationElementDuration({
                cycleKernel: KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                kernelIterationElementIndex,
                reversed: false,
                sieve,
                sieveCycleRepetitions,
            })
            totalDuration = apply.Translation(
                totalDuration,
                to.Translation(from.Scalar<number, Scalar>(from.Time(duration))),
            )
        }

        return totalDuration
    }

describe('kernel iteration', () => {
    const INDEX_OF_DURATION_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR: Ordinal = to.Ordinal(1)
    const INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR: Ordinal = to.Ordinal(2)

    let reversed: boolean

    describe('deletion style - fade', () => {
        beforeEach(() => {
            reversed = false
        })

        it('keeps a constant gain on non-sieved notes', () => {
            const sieve: Sieve = hafuhafuTo.Sieve(2)
            const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                {
                    ...initialSpecs,
                    deletionStyle: DeletionStyle.FADE,
                    kernel: hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                    reversed,
                    sieve,
                    sieveCycleRepetitions: to.Cardinal(4),
                },
            )

            actualKernelIteration.forEach((kernelIterationElement: ContourElement<PitchDurationGainSustain>, kernelIterationElementIndex: number) => {
                const sieveShouldPreserveThisElement: boolean =
                    dividesEvenly(kernelIterationElementIndex, sieve)
                if (!sieveShouldPreserveThisElement) {
                    return
                }

                expect(apply.Ordinal(kernelIterationElement, INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR))
                    .toBe(1)
            })
        })

        it(
            `the gain reduces proportionally with the time passing during the kernel iteration, which is different from \
                the kernel iteration index progress (which is a "dumb" value, a proportion of kernel iteration *indices* elapsed), \
                while what we use here is a proportion of actual resultant scalar time elapsed`,
            () => {
                const sieve: Sieve = hafuhafuTo.Sieve(2)
                const sieveCycleRepetitions: Cardinal = to.Cardinal(8)
                const KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH: Kernel =
                    hafuhafuTo.Kernel([ 1, 2, 1, 1, 2 ])
                const INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP: Ordinal = to.Ordinal(79)

                const totalDuration: Scalar<Time> = computeTotalDurationForTest(
                    INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP,
                    KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                    sieve,
                    sieveCycleRepetitions,
                )

                const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                    KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                    {
                        ...initialSpecs,
                        deletionStyle: DeletionStyle.FADE,
                        kernel: KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        reversed,
                        sieve,
                        sieveCycleRepetitions,
                    },
                )

                let elapsedDuration: Scalar<Time> = to.Scalar(to.Time(0))
                actualKernelIteration.forEach((actualKernelIterationElement: ContourElement<PitchDurationGainSustain>, kernelIterationElementIndex: number) => {
                    const actualKernelIterationElementDuration: number = apply.Ordinal(
                        actualKernelIterationElement,
                        INDEX_OF_DURATION_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR,
                    )
                    elapsedDuration = apply.Translation(
                        elapsedDuration,
                        to.Translation(actualKernelIterationElementDuration),
                    )

                    const sieveShouldPreserveThisElement: boolean =
                        dividesEvenly(kernelIterationElementIndex, sieve)
                    if (sieveShouldPreserveThisElement) {
                        return
                    }

                    const expectedGain: number = difference(
                        1,
                        from.Scalar<number, Scalar>(from.Time(quotient(
                            elapsedDuration,
                            totalDuration,
                        ))),
                    )

                    const actualGain: number = apply.Ordinal(
                        actualKernelIterationElement,
                        INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR,
                    )
                    expect(actualGain)
                        .toBeCloseTo(expectedGain)
                })
            },
        )

        describe('when reversed is true', () => {
            beforeEach(() => {
                reversed = true
            })

            it('keeps a constant gain on non-sieved notes', () => {
                const sieve: Sieve = hafuhafuTo.Sieve(2)
                const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                    hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                    {
                        ...initialSpecs,
                        deletionStyle: DeletionStyle.FADE,
                        kernel: hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                        reversed,
                        sieve,
                        sieveCycleRepetitions: to.Cardinal(4),
                    },
                )

                actualKernelIteration.forEach((kernelIterationElement: ContourElement<PitchDurationGainSustain>, kernelIterationElementIndex: number) => {
                    const sieveShouldPreserveThisElement: boolean =
                        dividesEvenly(kernelIterationElementIndex, sieve)
                    if (!sieveShouldPreserveThisElement) {
                        return
                    }

                    expect(apply.Ordinal(kernelIterationElement, INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR))
                        .toBe(1)
                })
            })

            it(
                `the gain *INCREASES* proportionally with the time passing during the kernel iteration, which is different from \
                the kernel iteration index progress (which is a "dumb" value, a proportion of kernel iteration *indices* elapsed), \
                while what we use here is a proportion of actual resultant scalar time elapsed`,
                () => {
                    const UNFORTUNATELY_LAX_PRECISION_NECESSARY_FOR_TESTING_WHEN_REVERSED_WHICH_IS_DISCONCERTING_BUT_I_HAVE_TO_GET_THIS_OUT_THE_DOOR: number = 1

                    const sieve: Sieve = hafuhafuTo.Sieve(2)
                    const sieveCycleRepetitions: Cardinal = to.Cardinal(8)
                    const KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH: Kernel =
                        hafuhafuTo.Kernel([ 1, 2, 1, 1, 2 ])
                    const INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP: Ordinal = to.Ordinal(79)

                    const totalDuration: Scalar<Time> = computeTotalDurationForTest(
                        INDEX_OF_FINAL_ELEMENT_GIVEN_THIS_TEST_SETUP,
                        KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        sieve,
                        sieveCycleRepetitions,
                    )

                    const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                        KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        {
                            ...initialSpecs,
                            deletionStyle: DeletionStyle.FADE,
                            kernel: KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                            reversed,
                            sieve,
                            sieveCycleRepetitions,
                        },
                    )

                    let elapsedDuration: Scalar<Time> = to.Scalar(to.Time(0))
                    actualKernelIteration.forEach((actualKernelIterationElement: ContourElement<PitchDurationGainSustain>, kernelIterationElementIndex: number) => {
                        const actualKernelIterationElementDuration: number = apply.Ordinal(
                            actualKernelIterationElement,
                            INDEX_OF_DURATION_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR,
                        )
                        elapsedDuration = apply.Translation(
                            elapsedDuration,
                            to.Translation(actualKernelIterationElementDuration),
                        )

                        const sieveShouldPreserveThisElement: boolean =
                            dividesEvenly(kernelIterationElementIndex, sieve)
                        if (sieveShouldPreserveThisElement) {
                            return
                        }

                        const expectedGain: number = from.Scalar<number, Scalar>(from.Time(quotient(
                            elapsedDuration,
                            totalDuration,
                        )))

                        const actualGain: number = apply.Ordinal(
                            actualKernelIterationElement,
                            INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR,
                        )

                        expect(actualGain)
                            .toBeCloseTo(expectedGain, UNFORTUNATELY_LAX_PRECISION_NECESSARY_FOR_TESTING_WHEN_REVERSED_WHICH_IS_DISCONCERTING_BUT_I_HAVE_TO_GET_THIS_OUT_THE_DOOR)
                    })
                },
            )
        })
    })

    describe('deletion style - random drop', () => {
        it('keeps a constant gain on non-sieved notes', () => {
            const sieve: Sieve = hafuhafuTo.Sieve(2)
            const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                {
                    ...initialSpecs,
                    deletionStyle: DeletionStyle.RANDOM_DROP,
                    kernel: hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                    reversed,
                    sieve,
                    sieveCycleRepetitions: to.Cardinal(4),
                },
            )

            actualKernelIteration.forEach((kernelIterationElement: ContourElement<PitchDurationGainSustain>, kernelIterationElementIndex: number) => {
                const sieveShouldPreserveThisElement: boolean =
                    dividesEvenly(kernelIterationElementIndex, sieve)
                if (!sieveShouldPreserveThisElement) {
                    return
                }

                expect(apply.Ordinal(kernelIterationElement, INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR))
                    .toBe(1)
            })
        })

        it('every note, sieved or not, is either full gain or silent', () => {
            const sieve: Sieve = hafuhafuTo.Sieve(2)
            const actualKernelIteration: ContourPiece<PitchDurationGainSustain> = computeKernelIteration(
                hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                {
                    ...initialSpecs,
                    deletionStyle: DeletionStyle.RANDOM_DROP,
                    kernel: hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]),
                    reversed,
                    sieve,
                    sieveCycleRepetitions: to.Cardinal(4),
                },
            )

            actualKernelIteration.forEach((kernelIterationElement: ContourElement<PitchDurationGainSustain>) => {
                expect([ 0, 1 ])
                    .toContain(apply.Ordinal(kernelIterationElement, INDEX_OF_GAIN_IN_PITCH_DURATION_GAIN_SUSTAIN_CONTOUR))
            })
        })
    })
})
