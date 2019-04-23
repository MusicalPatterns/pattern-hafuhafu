import { as, Cardinal, Time } from '@musical-patterns/utilities'
import { computeSustain, Layer, LayerIndex, Sieve } from '../../../../../src/indexForTest'

describe('sustain', () => {
    let sieve: Sieve
    let layerCount: Cardinal<Layer[]>

    describe('when sieve is 2 and layer count is 2 (OG hafuhafu)', () => {
        beforeEach(() => {
            sieve = as.Multiple<LayerIndex>(2)
            layerCount = as.Cardinal<Layer[]>(2)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(as.Scalar<Time>(1 / 2))
            },
        )
    })

    describe('when sieve is 3 and layer count is 4 (some new kind of super hafuhafu)', () => {
        beforeEach(() => {
            sieve = as.Multiple<LayerIndex>(3)
            layerCount = as.Cardinal<Layer[]>(4)
        })

        it(
            `every sustain is the same, and its the reciprocal of the sieve, so that even when sieve-x notes are playing \
in the space of 1 right before all the sieved ones finally officially cease to exist, the one note \
in the cluster that is audible does not seem to suddenly become more staccato after it wraps around`,
            () => {
                expect(computeSustain({ sieve }))
                    .toBe(as.Scalar<Time>(1 / 3))
            },
        )
    })
})
