import { to } from '@musical-patterns/utilities'
import { computeKernelCycle, Sieve, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('kernel cycle', () => {
    it('returns the cycle of kernels required to get from the original kernel back to itself by repeatedly applying the sieve', () => {
        const sieve: Sieve = hafuhafuTo.Sieve(2)

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]), sieve))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ]), sieve))
            .toEqual(to.Cycle([
                [ 0, 1, 0, 0, 1 ],
                [ 0, 0, 1, 1, 0 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 0, 1, 0, 1, 1 ]), sieve))
            .toEqual(to.Cycle([
                [ 0, 0, 0, 1, 0, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1, 1, 0, 0, 1 ]), sieve))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 1, 0, 0, 1 ],
                [ 0, 1, 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 0, 1, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))
    })

    it('when sieve is 3', () => {
        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ]), hafuhafuTo.Sieve(3)))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 0, 0, 1, 1 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 1, 1, 0, 0 ],
            ].map(hafuhafuTo.Kernel)))
    })

    it('when sieve is greater than the kernel length, it still works', () => {
        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1 ]), hafuhafuTo.Sieve(5)))
            .toEqual(to.Cycle([
                [ 0, 0, 1 ],
                [ 0, 1, 0 ],
            ].map(hafuhafuTo.Kernel)))
    })
})
