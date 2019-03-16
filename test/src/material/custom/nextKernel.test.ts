import { computeNextKernel, to } from '../../../../src/indexForTest'

describe('next kernel', () => {
    it(
        `returns the kernel composed of the same length and members as the original, \
        but formed by choosing every other note, wrapping around the end, until you have choosed each of them`,
        () => {
            expect(computeNextKernel(to.Kernel([ 0, 0, 1, 0, 1 ])))
                .toEqual(to.Kernel([ 0, 1, 1, 0, 0 ]))
        },
    )
})
