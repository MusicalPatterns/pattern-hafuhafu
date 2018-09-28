import { hafuhafuNote } from '../src/notes'
import * as to from '../../../src/utilities/to'
import * as hafuhafuTo from '../src/utilities/to'

describe('notes', () => {
    it('hafuhafu note offsets the cell by one to get the pitch index', () => {
        expect(hafuhafuNote(hafuhafuTo.Cell(3))).toEqual({
            duration: to.Time(1),
            gain: to.Scalar(1),
            pitchIndex: to.Index(4),
            scaleIndex: to.Index(0),
            sustain: to.Time(0.9),
        })
        expect(hafuhafuNote(hafuhafuTo.Cell(4))).toEqual({
            duration: to.Time(1),
            gain: to.Scalar(1),
            pitchIndex: to.Index(5),
            scaleIndex: to.Index(0),
            sustain: to.Time(0.9),
        })
    })
})
