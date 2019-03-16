import { to } from '@musical-patterns/utilities'
import { computeKernelCycle, to as hafuhafuTo } from '../../../../src/indexForTest'

describe('kernel cycle', () => {
    it('returns the cycle of kernels required to get from the original kernel back to itself', () => {
        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 1, 0, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 1, 0, 0, 1 ],
                [ 0, 0, 1, 1, 0 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 0, 1, 0, 1, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 0, 1, 0, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))

        expect(computeKernelCycle(hafuhafuTo.Kernel([ 0, 0, 1, 1, 0, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 1, 0, 0, 1 ],
                [ 0, 1, 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 0, 1, 1, 1 ],
            ].map(hafuhafuTo.Kernel)))
    })
})
