import { Notes } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Count, Index, Scalar } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { hafuhafuWithPitchCircularityNotes } from '../src/hafuhafuWithPitchCircularityNotes'
import { fiveRhythm } from '../src/rhythms'
import { Direction } from '../src/types'

describe('hafuhafu notes with pitch circularity', () => {
    let result: Notes = []
    const TEST_BAR_COUNT: Count = to.Count(32)
    const CELL_COUNT_OF_FIVE_RHTYHM: Count = to.Count(5)
    const expectedNotesCount: Count = to.Count(from.Count(CELL_COUNT_OF_FIVE_RHTYHM) * from.Count(TEST_BAR_COUNT))
    const expectedTempoAdjustment: Scalar = to.Scalar(50)

    describe('in', () => {
        beforeEach(() => {
            result = hafuhafuWithPitchCircularityNotes(fiveRhythm, TEST_BAR_COUNT, Direction.IN)
        })

        it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
            expect(to.Count(result.length)).toBe(expectedNotesCount)
        })

        it('gradually increases the gain from silence to full (this one is linear because the between silence and 1 is artificially curved)', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = offset(i, to.Offset(1))) {
                expect(result[from.Index(i)].gain).toBe(to.Scalar(from.Index(i) / from.Count(expectedNotesCount)))
            }
        })

        it('gradually increases the pitch scalar from half to normal', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = offset(i, to.Offset(1))) {
                expect(from.Scalar(result[from.Index(i)].pitchScalar)).toBe(
                    Math.pow(2, (from.Index(i) / from.Count(expectedNotesCount)) - 1),
                )
            }
        })

        it('gradually decreases the duration of the notes from 2 to 1, making the tempo change from 1/2x to 1x', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = offset(i, to.Offset(1))) {
                expect(from.Time(result[from.Index(i)].duration)).toBe(
                    scale(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount))), expectedTempoAdjustment),
                )
            }
        })

        it('the sustain is always half of the duration', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = offset(i, to.Offset(1))) {
                expect(result[from.Index(i)].sustain).toBe(scale(result[from.Index(i)].duration, to.Scalar(1 / 2)))
            }
        })
    })

    describe('out', () => {
        beforeEach(() => {
            result = hafuhafuWithPitchCircularityNotes(fiveRhythm, TEST_BAR_COUNT, Direction.OUT)
        })

        it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
            expect(to.Count(result.length)).toBe(scale(expectedNotesCount, to.Scalar(2)))
        })

        it('gradually decreases the gain from full to silence', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(scale(expectedNotesCount, to.Scalar(2)))); i = offset(i, to.Offset(1))) {
                expect(from.Scalar(result[from.Index(i)].gain)).toBe(
                    Math.pow(2, 1 - (from.Index(i) / from.Count(scale(expectedNotesCount, to.Scalar(2))))) - 1,
                )
            }
        })

        it('gradually increases the pitch scalar from normal to twice', () => {
            for (let i: Index = to.Index(1); i < to.Index(from.Count(scale(expectedNotesCount, to.Scalar(2)))); i = offset(i, to.Offset(1))) {
                expect(from.Scalar(result[from.Index(i)].pitchScalar)).toBe(
                    Math.pow(2, from.Index(i) / from.Count(scale(expectedNotesCount, to.Scalar(2)))),
                )
            }
        })

        it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
            for (let i: Index = to.Index(0); i < to.Index(from.Count(scale(expectedNotesCount, to.Scalar(2)))); i = offset(i, to.Offset(1))) {
                expect(from.Time(result[from.Index(i)].duration)).toBe(
                    scale(Math.pow(2, -(from.Index(i) / from.Count(scale(expectedNotesCount, to.Scalar(2))))), expectedTempoAdjustment),
                )
            }
        })

        it('the sustain is always half of the duration', () => {
            for (let i: Index = to.Index(0); i < to.Index(from.Count(scale(expectedNotesCount, to.Scalar(2)))); i = offset(i, to.Offset(1))) {
                expect(from.Time(result[from.Index(i)].sustain)).toBe(
                    from.Time(result[from.Index(i)].duration) / 2,
                )
            }
        })
    })
})
