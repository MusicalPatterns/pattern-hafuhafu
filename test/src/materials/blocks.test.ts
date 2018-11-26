import { to } from '../../../../../indexForTest'
import { buildBlock } from '../../../src/indexForTest'

describe('hafuhafu blocks', () => {
    it('returns the block the same length as the original, but only taking every other note, wrapping around the end', () => {
        expect(buildBlock(to.Block([ 0, 0, 1, 0, 1 ])))
            .toEqual(to.Block([ 0, 1, 1, 0, 0 ]))
    })
})
