import { Cardinal, Multiple, Ordinal, Time, to } from '@musical-patterns/utilities'
import { computeSustain } from '../../../../../src/indexForTest'

describe('sustain', () => {
    let sieve: Multiple<Ordinal>
    let layerCount: Cardinal

    describe('when sieve is 2 and layer count is 2 (OG hafuhafu)', () => {
        beforeEach(() => {
            sieve = to.Multiple<Ordinal>(2)
            layerCount = to.Cardinal(2)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(to.Scalar<Time>(1 / 2))
            },
        )
    })

    describe('when sieve is 3 and layer count is 4 (some new kind of super hafuhafu)', () => {
        beforeEach(() => {
            sieve = to.Multiple<Ordinal>(3)
            layerCount = to.Cardinal(4)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(to.Scalar<Time>(1 / 3))
            },
        )
    })
})
