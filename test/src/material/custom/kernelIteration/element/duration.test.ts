import {
    apply,
    Cardinal,
    difference,
    Ordinal,
    PREVIOUS,
    Scalar,
    testIsCloseTo,
    Time,
    to,
} from '@musical-patterns/utilities'
import {
    computeKernelIterationElementDuration,
    Kernel,
    Sieve,
    to as hafuhafuTo,
} from '../../../../../../src/indexForTest'

describe('kernel iteration element duration', () => {
    let sieve: Sieve

    const sieveCycleRepetitions: Cardinal = to.Cardinal(5)
    const reversed: boolean = false
    const cycleKernel: Kernel = hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ])
    let indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact: Ordinal

    describe('when sieve is 2', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(2)
            indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = to.Ordinal(50)
        })

        it('when a kernel iteration begins, gives you the full duration 1', () => {
            const actualElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
                cycleKernel,
                kernelIterationElementIndex: to.Ordinal(0),
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(actualElementDuration)
                .toBe(to.Scalar(to.Time(1)))
        })

        it(
            `when a kernel iteration is ending, gives you the duration 1/sieve (in this case 1/2), \
            effectively increasing the tempo sieve-fold to counteract the fading out of the count of sieved notes`,
            () => {
                const actualElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                expect(actualElementDuration)
                    .toBe(to.Scalar(to.Time(1 / 2)))
            },
        )

        it(
            `the kernel iteration index progress is a "dumb" value, incrementing flatly; \
            duration though, needs to be changing by sieve times as much at the beginning of a kernel iteration, \
            because there are 1/sieve as many notes happening then`,
            () => {
                const firstIterationBeginningMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: to.Ordinal(0),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const secondIterationBeginningMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: to.Ordinal(1),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const changeInDurationAtTheIterationBeginningOverTheExampleInterval: Scalar<Time> =
                    difference(firstIterationBeginningMeasurement, secondIterationBeginningMeasurement)

                const firstIterationEndingMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: apply.Translation(indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact, PREVIOUS),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const secondIterationEndingMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const changeInDurationAtTheIterationEndingOverTheExampleInterval: Scalar<Time> =
                    difference(firstIterationEndingMeasurement, secondIterationEndingMeasurement)

                testIsCloseTo(
                    changeInDurationAtTheIterationBeginningOverTheExampleInterval,
                    apply.Scalar(changeInDurationAtTheIterationEndingOverTheExampleInterval, to.Scalar(2)),
                )
            },
        )
    })

    describe('when sieve is 3', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(3)
            indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = to.Ordinal(75)
        })

        it('when a kernel iteration begins, gives you the full duration 1', () => {
            const actualElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
                cycleKernel,
                kernelIterationElementIndex: to.Ordinal(0),
                reversed,
                sieve,
                sieveCycleRepetitions,
            })

            expect(actualElementDuration)
                .toBe(to.Scalar(to.Time(1)))
        })

        it(
            `when a kernel iteration is ending, gives you the duration 1/sieve (in this case 1/2), \
            effectively increasing the tempo sieve-fold to counteract the fading out of the count of sieved notes`,
            () => {
                const actualElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })

                expect(actualElementDuration)
                    .toBe(to.Scalar(to.Time(1 / 3)))
            },
        )

        it(
            `the kernel iteration index progress is a "dumb" value, incrementing flatly; \
            duration though, needs to be changing by sieve times as much at the beginning of a kernel iteration, \
            because there are 1/sieve as many notes happening then`,
            () => {
                const firstIterationBeginningMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: to.Ordinal(0),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const secondIterationBeginningMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: to.Ordinal(1),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const changeInDurationAtTheIterationBeginningOverTheExampleInterval: Scalar<Time> =
                    difference(firstIterationBeginningMeasurement, secondIterationBeginningMeasurement)

                const firstIterationEndingMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: apply.Translation(indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact, PREVIOUS),
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const secondIterationEndingMeasurement: Scalar<Time> = computeKernelIterationElementDuration({
                    cycleKernel,
                    kernelIterationElementIndex: indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact,
                    reversed,
                    sieve,
                    sieveCycleRepetitions,
                })
                const changeInDurationAtTheIterationEndingOverTheExampleInterval: Scalar<Time> =
                    difference(firstIterationEndingMeasurement, secondIterationEndingMeasurement)

                testIsCloseTo(
                    changeInDurationAtTheIterationBeginningOverTheExampleInterval,
                    apply.Scalar(changeInDurationAtTheIterationEndingOverTheExampleInterval, to.Scalar(3)),
                )
            },
        )
    })
})
