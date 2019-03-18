import { FULL_GAIN, SILENT } from '@musical-patterns/pattern'
import { Amplitude, NormalScalar, Ordinal, Scalar, to } from '@musical-patterns/utilities'
import {
    computeKernelIterationElementGain,
    computeRandomDropGain,
    DeletionStyle,
    Sieve,
    to as hafuhafuTo,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('kernel iteration element gain', () => {
    it('when the kernel iteration element index is divisible by the sieve, full gain', () => {
        const deletionStyle: DeletionStyle = DeletionStyle.FADE
        const kernelIterationDurationProgress: NormalScalar = to.Scalar(0.3)
        const kernelIterationElementIndex: Ordinal = to.Ordinal(64)
        const reversed: boolean = false
        const sieve: Sieve = hafuhafuTo.Sieve(8)

        const actualKernelIterationElementGain: Scalar<Amplitude> = computeKernelIterationElementGain({
            deletionStyle,
            kernelIterationDurationProgress,
            kernelIterationElementIndex,
            reversed,
            sieve,
        })

        expect(actualKernelIterationElementGain)
            .toBe(to.Scalar(to.Amplitude(1)))
    })

    it('when the kernel iteration element index is not divisible by the sieve, gain is 1 - the kernel iteration duration progress', () => {
        const deletionStyle: DeletionStyle = DeletionStyle.FADE
        const kernelIterationDurationProgress: NormalScalar = to.Scalar(0.3)
        const kernelIterationElementIndex: Ordinal = to.Ordinal(74)
        const reversed: boolean = false
        const sieve: Sieve = hafuhafuTo.Sieve(8)

        const actualKernelIterationElementGain: Scalar<Amplitude> = computeKernelIterationElementGain({
            deletionStyle,
            kernelIterationDurationProgress,
            kernelIterationElementIndex,
            reversed,
            sieve,
        })

        expect(actualKernelIterationElementGain)
            .toBe(to.Scalar(to.Amplitude(0.7)))
    })

    describe('when reversed is true', () => {
        it('when the kernel iteration element index is divisible by the sieve, full gain, same as when not reversed', () => {
            const deletionStyle: DeletionStyle = DeletionStyle.FADE
            const kernelIterationDurationProgress: NormalScalar = to.Scalar(0.3)
            const kernelIterationElementIndex: Ordinal = to.Ordinal(64)
            const reversed: boolean = true
            const sieve: Sieve = hafuhafuTo.Sieve(8)

            const actualKernelIterationElementGain: Scalar<Amplitude> = computeKernelIterationElementGain({
                deletionStyle,
                kernelIterationDurationProgress,
                kernelIterationElementIndex,
                reversed,
                sieve,
            })

            expect(actualKernelIterationElementGain)
                .toBe(to.Scalar(to.Amplitude(1)))
        })

        it('when the kernel iteration element index is not divisible by the sieve, gain is = the kernel iteration duration progress', () => {
            const deletionStyle: DeletionStyle = DeletionStyle.FADE
            const kernelIterationDurationProgress: NormalScalar = to.Scalar(0.3)
            const kernelIterationElementIndex: Ordinal = to.Ordinal(74)
            const reversed: boolean = true
            const sieve: Sieve = hafuhafuTo.Sieve(8)

            const actualKernelIterationElementGain: Scalar<Amplitude> = computeKernelIterationElementGain({
                deletionStyle,
                kernelIterationDurationProgress,
                kernelIterationElementIndex,
                reversed,
                sieve,
            })

            expect(actualKernelIterationElementGain)
                .toBe(to.Scalar(to.Amplitude(0.3)))
        })
    })

    describe('random drop grain', () => {
        const ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED: number = 0.3
        it('when the fading gain is less than the randomly generated value, the note is dropped (gain set to 0)', () => {
            const randomSpy: Spy = jasmine.createSpy()
            randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

            const fadingGainWhichIsTooWeakToBeatTheRandomSieveThisTime: Scalar<Amplitude> = to.Scalar(to.Amplitude(0.2))
            const actualRandomDropGain: Scalar<Amplitude> = computeRandomDropGain({
                fadingGain: fadingGainWhichIsTooWeakToBeatTheRandomSieveThisTime,
                randomizingFunction: randomSpy,
            })

            expect(actualRandomDropGain)
                .toBe(SILENT)
        })

        it('when the fading gain is greater than the randomly generated value, the note is fully present (gain set to 1)', () => {
            const randomSpy: Spy = jasmine.createSpy()
            randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

            const fadingGainWhichIsStrongEnoughToBeatTheRandomSieveThisTime: Scalar<Amplitude> = to.Scalar(to.Amplitude(0.6))
            const actualRandomDropGain: Scalar<Amplitude> = computeRandomDropGain({
                fadingGain: fadingGainWhichIsStrongEnoughToBeatTheRandomSieveThisTime,
                randomizingFunction: randomSpy,
            })

            expect(actualRandomDropGain)
                .toBe(FULL_GAIN)
        })
    })
})
