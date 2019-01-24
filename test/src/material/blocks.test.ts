import { to } from '@musical-patterns/utilities'
import { buildNextBlock } from '../../../src/indexForTest'

describe('blocks', () => {
    it('returns the block the same length as the original, but only taking every other note, wrapping around the end', () => {
        expect(buildNextBlock(to.Block([ 0, 0, 1, 0, 1 ])))
            .toEqual(to.Block([ 0, 1, 1, 0, 0 ]))
    })
})
