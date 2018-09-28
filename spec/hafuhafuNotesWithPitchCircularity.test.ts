import { fiveRhythm } from '../src/rhythms'
import * as from from '../../../src/utilities/from'
import { Note } from '../../../src/types'
import { hafuhafuNotesWithPitchCircularity } from '../src/hafuhafuNotesWithPitchCircularity'
import { Direction } from '../src/types'

describe('hafuhafu notes with pitch circularity', () => {
    let result: Note[] = []
    const expectedLength: number = 5 * 32
    const expectedTempoAdjustment: number = 50

    describe('in', () => {
        beforeEach(() => {
            result = hafuhafuNotesWithPitchCircularity(fiveRhythm, 32, Direction.IN)
        })

        it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
            expect(result.length).toBe(expectedLength)
        })

        it('gradually increases the gain from silence to full', () => {
            for (let i: number = 1; i < expectedLength; i++) {
                expect(from.Scalar(result[i].gain)).toBe(i / expectedLength)
            }
        })

        // but it should be by power of 2, from 2^-1 to 2^0
        it('gradually increases the pitch scalar from half to normal', () => {
            for (let i: number = 1; i < expectedLength; i++) {
                // expect(from.Scalar(result[i].pitchScalar)).toBe(0.5 + (i / expectedLength) * 0.5)
                expect(from.Scalar(result[i].pitchScalar)).toBe(Math.pow(2, (i / expectedLength) - 1))
            }
        })

        // but it should be by power of 2, from 2^1 to 2^0
        it('gradually decreases the duration of the notes from 2 to 1, making the tempo change from 1/2x to 1x', () => {
            for (let i: number = 0; i < expectedLength; i++) {
                // expect(from.Time(result[i].duration)).toBe((2 - (i / expectedLength)) * expectedTempoAdjustment)
                expect(from.Time(result[i].duration)).toBe(Math.pow(2, 1 - (i / expectedLength)) * expectedTempoAdjustment)
            }
        })

        it('the sustain is always half of the duration', () => {
            for (let i: number = 0; i < expectedLength; i++) {
                expect(from.Time(result[i].sustain)).toBe(from.Time(result[i].duration) / 2)
            }
        })
    })

    describe('out', () => {
        beforeEach(() => {
            result = hafuhafuNotesWithPitchCircularity(fiveRhythm, 32, Direction.OUT)
        })

        it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
            expect(result.length).toBe(expectedLength * 2)
        })

        it('gradually decreases the gain from full to silence', () => {
            for (let i: number = 1; i < (expectedLength * 2); i++) {
                expect(from.Scalar(result[i].gain)).toBe(1 - (i / (expectedLength * 2)))
            }
        })

        // but it should be by power of 2, from 2^0 to 2^1
        it('gradually increases the pitch scalar from normal to twice', () => {
            for (let i: number = 1; i < (expectedLength * 2); i++) {
                // expect(from.Scalar(result[i].pitchScalar)).toBe(1 + (i / expectedLength))
                expect(from.Scalar(result[i].pitchScalar)).toBe(Math.pow(2, i / (expectedLength * 2)))
            }
        })

        // but it should be by power of 2, from 2^0 to 2^-1
        it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
            for (let i: number = 0; i < (expectedLength * 2); i++) {
                // expect(from.Time(result[i].duration)).toBe((1 - (i * 0.5 / expectedLength)) * expectedTempoAdjustment)
                expect(from.Time(result[i].duration)).toBe(Math.pow(2, -(i / (expectedLength * 2))) * expectedTempoAdjustment)
            }
        })

        it('the sustain is always half of the duration', () => {
            for (let i: number = 0; i < (expectedLength * 2); i++) {
                expect(from.Time(result[i].sustain)).toBe(from.Time(result[i].duration) / 2)
            }
        })
    })
})