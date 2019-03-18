import { computeNextKernel, Sieve, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('next kernel', () => {
    it(
        `when the sieve is 2, returns the kernel composed of the same length and members as the original, \
        but formed by choosing every other note, wrapping around the end, until you have chosen each of them`,
        () => {
            const sieve: Sieve = hafuhafuTo.Sieve(2)

            expect(computeNextKernel(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]), sieve))
                .toEqual(hafuhafuTo.Kernel([ 0, 1, 1, 0, 0 ]))
        },
    )

    it(
        `when the sieve is 3, returns the kernel composed of the same length and members as the original, \
        but formed by choosing every other note, wrapping around the end, until you have chosen each of them`,
        () => {
            const sieve: Sieve = hafuhafuTo.Sieve(3)

            expect(computeNextKernel(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]), sieve))
                .toEqual(hafuhafuTo.Kernel([ 0, 0, 0, 1, 1 ]))
        },
    )

    it(
        `even works when the sieve is greater than the kernel length (though its just icing on top of the same sieve \
        one modulus down (although choosing sieve 1 greater than the length is interesting because you can't get sieve 1))`,
        () => {
            const sieve: Sieve = hafuhafuTo.Sieve(6)

            expect(computeNextKernel(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]), sieve))
                .toEqual(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]))
        },
    )
})
