import { fiveRhythm } from '../src/rhythms'
import * as to from '../src/utilities/to'

describe('notes', () => {
    it('five rhythm is the minimum necessary base rhythm', () => {
        expect(fiveRhythm).toEqual(to.Rhythm([0, 1, 0, 0, 1]))
    })
})
