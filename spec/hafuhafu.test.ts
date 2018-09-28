import { hafuhafu } from '../src/hafuhafu'
import { fiveRhythm } from '../src/rhythms'
import { Note } from '../../../src/types'
import * as from from '../../../src/utilities/from'

describe('hafuhafu', () => {
    let result: Note[] = []
    const expectedLength: number = 5 * 32
    const expectedTempoAdjustment: number = 50

    beforeEach(() => {
        result = hafuhafu(fiveRhythm, 32)
    })

    it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
        expect(result.length).toBe(expectedLength)
    })

    it('keeps a constant gain on the even notes', () => {
        for (let i: number = 0; i < expectedLength; i = i + 2) {
            expect(from.Scalar(result[i].gain)).toBe(1)
        }
    })

    it('gradually reduces the gain on the odd notes until they are silent', () => {
        for (let i: number = 1; i < expectedLength; i = i + 2) {
            expect(from.Scalar(result[i].gain)).toBe(1 - (i / expectedLength))
        }
    })

    it('gradually decreases the duration of the notes until the tempo is 2x', () => {
        for (let i: number = 0; i < expectedLength; i++) {
            expect(from.Time(result[i].duration)).toBe((2 - (i / expectedLength)) * expectedTempoAdjustment)
        }
    })

    it('keeps a constant sustain of the notes, slightly shorter than half the first duration', () => {
        for (let i: number = 0; i < expectedLength; i++) {
            expect(from.Time(result[i].sustain)).toBe(0.8 * expectedTempoAdjustment)
        }
    })
})
