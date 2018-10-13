import * as to from '../../../src/utilities/to'
import { octaveSeriesScale } from '../src/scales'

describe('scales', () => {
    it('octave series scale increases by factor of 2 each step', () => {
        expect(octaveSeriesScale[0]).toEqual(to.Scalar(1))
        expect(octaveSeriesScale[1]).toEqual(to.Scalar(2))
        expect(octaveSeriesScale[2]).toEqual(to.Scalar(4))
        expect(octaveSeriesScale[3]).toEqual(to.Scalar(8))
        expect(octaveSeriesScale[4]).toEqual(to.Scalar(16))
        expect(octaveSeriesScale[5]).toEqual(to.Scalar(32))
    })
})
