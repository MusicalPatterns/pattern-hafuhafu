import { octaveSeries } from '../src/pitches'
import * as to from '../../../src/utilities/to'

describe('pitches', () => {
    it('octave series increases by factor of 2 each step', () => {
        expect(octaveSeries[0]).toEqual(to.Scalar(1))
        expect(octaveSeries[1]).toEqual(to.Scalar(2))
        expect(octaveSeries[2]).toEqual(to.Scalar(4))
        expect(octaveSeries[3]).toEqual(to.Scalar(8))
        expect(octaveSeries[4]).toEqual(to.Scalar(16))
        expect(octaveSeries[5]).toEqual(to.Scalar(32))
    })
})
