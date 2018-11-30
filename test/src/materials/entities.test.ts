import { to } from '@musical-patterns/pattern'
import { buildHafuhafuCycle } from '../../../src/indexForTest'

describe('hafuhafu cycles', () => {
    it('returns the array of blocks required to get from the original block back to itself', () => {
        expect(buildHafuhafuCycle(to.Block([ 0, 0, 1, 0, 1 ])))
            .toEqual([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 1, 1 ],
            ].map(to.Block))

        expect(buildHafuhafuCycle(to.Block([ 0, 1, 0, 0, 1 ])))
            .toEqual([
                [ 0, 1, 0, 0, 1 ],
                [ 0, 0, 1, 1, 0 ],
            ].map(to.Block))

        expect(buildHafuhafuCycle(to.Block([ 0, 0, 0, 1, 0, 1, 1 ])))
            .toEqual([
                [ 0, 0, 0, 1, 0, 1, 1 ],
            ].map(to.Block))

        expect(buildHafuhafuCycle(to.Block([ 0, 0, 1, 1, 0, 0, 1 ])))
            .toEqual([
                [ 0, 0, 1, 1, 0, 0, 1 ],
                [ 0, 1, 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 0, 1, 1, 1 ],
            ].map(to.Block))
    })
})
