import * as to from '../../../src/utilities/to'
import { hafuhafuNote } from '../src/notes'
import * as hafuhafuTo from '../src/utilities/to'

describe('notes', () => {
    it('hafuhafu note offsets the cell by one to get the pitch index, and the sustain is 90% the duration', () => {
        expect(hafuhafuNote(hafuhafuTo.Cell(3), to.Scalar(0.5), to.Time(2), to.Time(1), to.Scalar(0.5))).toEqual({
            duration: to.Time(2),
            gain: to.Scalar(0.5),
            pitchIndex: to.Index(4),
            pitchScalar: to.Scalar(0.5),
            scaleIndex: to.Index(0),
            sustain: to.Time(1),
        })
        expect(hafuhafuNote(hafuhafuTo.Cell(4), to.Scalar(0.25), to.Time(1.5), to.Time(0.375), to.Scalar(1))).toEqual({
            duration: to.Time(1.5),
            gain: to.Scalar(0.25),
            pitchIndex: to.Index(5),
            pitchScalar: to.Scalar(1),
            scaleIndex: to.Index(0),
            sustain: to.Time(0.375),
        })
    })
})
