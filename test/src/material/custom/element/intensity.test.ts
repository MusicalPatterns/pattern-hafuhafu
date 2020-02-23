import Spy = jasmine.Spy
import { FULL_GAIN, SILENT } from '@musical-patterns/material'
import { as, Intensity, Scalar } from '@musical-patterns/utilities'
import { computeRandomDropIntensity } from '../../../../../src/indexForTest'

describe('random drop intensity', (): void => {
    const ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED: number = 0.3
    it('when the fading intensity is less than the randomly generated value, the note is dropped (intensity set to 0)', (): void => {
        const randomSpy: Spy = jasmine.createSpy()
        randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

        const fadingIntensityWhichIsTooWeakToBeatTheRandomSieveThisTime: Scalar<Intensity> = as.Scalar<Intensity>(0.2)
        const randomDropIntensity: Scalar<Intensity> = computeRandomDropIntensity({
            fadingIntensity: fadingIntensityWhichIsTooWeakToBeatTheRandomSieveThisTime,
            randomizingFunction: randomSpy,
        })

        expect(randomDropIntensity)
            .toBe(SILENT)
    })

    it('when the fading intensity is greater than the randomly generated value, the note is fully present (intensity set to 1)', (): void => {
        const randomSpy: Spy = jasmine.createSpy()
        randomSpy.and.returnValue(ARBITRARY_NUMBER_RANDOM_MIGHT_HAVE_GENERATED)

        const fadingIntensityWhichIsStrongEnoughToBeatTheRandomSieveThisTime: Scalar<Intensity> = as.Scalar<Intensity>(0.6)
        const randomDropIntensity: Scalar<Intensity> = computeRandomDropIntensity({
            fadingIntensity: fadingIntensityWhichIsStrongEnoughToBeatTheRandomSieveThisTime,
            randomizingFunction: randomSpy,
        })

        expect(randomDropIntensity)
            .toBe(FULL_GAIN)
    })
})
