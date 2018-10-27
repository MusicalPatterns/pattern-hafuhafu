import { hafuhafuRhythm, to } from '../src/indexForTest'

describe('hafuhafu rhythm', () => {
    it('returns the rhythm the same length as the original, taking every note, wrapping around the end', () => {
        expect(hafuhafuRhythm(to.Rhythm([ 0, 0, 1, 0, 1 ])))
            .toEqual(to.Rhythm([ 0, 1, 1, 0, 0 ]))
    })
})
