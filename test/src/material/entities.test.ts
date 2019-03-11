import { to } from '@musical-patterns/utilities'
import { computeCycle } from '../../../src/indexForTest'

describe('cycles', () => {
    it('returns the array of blocks required to get from the original block back to itself', () => {
        expect(computeCycle(to.Block([ 0, 0, 1, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 1, 1 ],
            ].map(to.Block)))

        expect(computeCycle(to.Block([ 0, 1, 0, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 1, 0, 0, 1 ],
                [ 0, 0, 1, 1, 0 ],
            ].map(to.Block)))

        expect(computeCycle(to.Block([ 0, 0, 0, 1, 0, 1, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 0, 1, 0, 1, 1 ],
            ].map(to.Block)))

        expect(computeCycle(to.Block([ 0, 0, 1, 1, 0, 0, 1 ])))
            .toEqual(to.Cycle([
                [ 0, 0, 1, 1, 0, 0, 1 ],
                [ 0, 1, 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 0, 1, 1, 1 ],
            ].map(to.Block)))
    })
})
