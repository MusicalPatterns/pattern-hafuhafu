import Spy = jasmine.Spy
import { FULL_GAIN, SILENT } from '@musical-patterns/pattern'
import { Amplitude, Scalar, to } from '@musical-patterns/utilities'
import { computeRandomDropGain } from '../../../../../src/indexForTest'

describe('random drop grain', () => {
    const ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED: number = 0.3
    it('when the fading gain is less than the randomly generated value, the note is dropped (gain set to 0)', () => {
        const randomSpy: Spy = jasmine.createSpy()
        randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

        const fadingGainWhichIsTooWeakToBeatTheRandomSieveThisTime: Scalar<Amplitude> = to.Scalar(to.Amplitude(0.2))
        const randomDropGain: Scalar<Amplitude> = computeRandomDropGain({
            fadingGain: fadingGainWhichIsTooWeakToBeatTheRandomSieveThisTime,
            randomizingFunction: randomSpy,
        })

        expect(randomDropGain)
            .toBe(SILENT)
    })

    it('when the fading gain is greater than the randomly generated value, the note is fully present (gain set to 1)', () => {
        const randomSpy: Spy = jasmine.createSpy()
        randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

        const fadingGainWhichIsStrongEnoughToBeatTheRandomSieveThisTime: Scalar<Amplitude> = to.Scalar(to.Amplitude(0.6))
        const randomDropGain: Scalar<Amplitude> = computeRandomDropGain({
            fadingGain: fadingGainWhichIsStrongEnoughToBeatTheRandomSieveThisTime,
            randomizingFunction: randomSpy,
        })

        expect(randomDropGain)
            .toBe(FULL_GAIN)
    })
})
