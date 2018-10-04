import { hafuhafuCycle } from '../src/hafuhafuCycle'
import * as to from '../src/utilities/to'

describe('hafuhafu cycle', () => {
    it('returns the array of rhythms required to get from the original rhythm back to itself', () => {
        expect(hafuhafuCycle(to.Rhythm([0, 0, 1, 0, 1]))).toEqual(to.Rhythms([
            [0, 0, 1, 0, 1],
            [0, 1, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 1],
        ]))

        expect(hafuhafuCycle(to.Rhythm([0, 1, 0, 0, 1]))).toEqual(to.Rhythms([
            [0, 1, 0, 0, 1],
            [0, 0, 1, 1, 0],
        ]))

        expect(hafuhafuCycle(to.Rhythm([0, 0, 0, 1, 0, 1, 1]))).toEqual(to.Rhythms([
            [0, 0, 0, 1, 0, 1, 1],
        ]))

        expect(hafuhafuCycle(to.Rhythm([0, 0, 1, 1, 0, 0, 1]))).toEqual(to.Rhythms([
            [0, 0, 1, 1, 0, 0, 1],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 1],
        ]))
    })
})
