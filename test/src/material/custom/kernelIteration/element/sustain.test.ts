import { to } from '@musical-patterns/utilities'
import { computeKernelIterationElementSustain, Sieve, to as hafuhafuTo } from '../../../../../../src/indexForTest'

describe('kernel iteration element sustain', () => {
    let sieve: Sieve

    describe('when sieve is 2 (OG hafuhafu)', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(2)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
            in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
            in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeKernelIterationElementSustain({ sieve }))
                    .toBe(to.Scalar(to.Time(1 / 2)))
            },
        )
    })

    describe('when sieve is 3 (new super hafuhafu)', () => {
        beforeEach(() => {
            sieve = hafuhafuTo.Sieve(3)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
            in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
            in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeKernelIterationElementSustain({ sieve }))
                    .toBe(to.Scalar(to.Time(1 / 3)))
            },
        )
    })
})
