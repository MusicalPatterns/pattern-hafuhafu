import { Cardinal, to } from '@musical-patterns/utilities'
import { computeSustain, Sieve, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('sustain', () => {
    let sieve: Sieve
    let layerCount: Cardinal

    describe('when sieve is 2 and layer count is 2 (OG hafuhafu)', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(2)
            layerCount = to.Cardinal(2)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(to.Scalar(to.Time(1 / 2)))
            },
        )
    })

    describe('when sieve is 3 and layer count is 4 (some new kind of super hafuhafu)', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(3)
            layerCount = to.Cardinal(4)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(to.Scalar(to.Time(1 / 3)))
            },
        )
    })
})
