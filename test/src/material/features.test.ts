// tslint:disable no-duplicate-string

import { Note, NoteFeature, PitchDurationGainSustainScale, Scale } from '@musical-patterns/material'
import { as, Duration, Gain, Pitch, Scalar } from '@musical-patterns/utilities'
import { computeNote } from '../../../src/indexForTest'

describe('features', () => {
    describe('example one', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(as.ContourElement<PitchDurationGainSustainScale>([ 3, 0.5, 2, 0.5, 0.333 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature<Duration>
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(as.Scalar<Duration>(0.5))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Duration>>>(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature<Gain>
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gain.scalar)
                    .toBe(as.Scalar<Gain>(2))
            })
        })

        describe('pitch', () => {
            let pitch: NoteFeature<Pitch>
            beforeEach(() => {
                pitch = note.pitch || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitch.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Pitch>>>(2))
            })

            it('uses the pitch parameter', () => {
                expect(pitch.index)
                    .toBe(as.Ordinal<Array<Scalar<Pitch>>>(3))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', () => {
                expect(pitch.scalar)
                    .toBe(as.Scalar<Pitch>(0.333))
            })
        })
    })

    describe('example two', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(as.ContourElement<PitchDurationGainSustainScale>([ 4, 0.25, 1.5, 0.25, 0.666 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature<Duration>
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(as.Scalar<Duration>(0.25))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Duration>>>(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature<Gain>
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gain.scalar)
                    .toBe(as.Scalar<Gain>(1.5))
            })
        })

        describe('pitch index', () => {
            let pitch: NoteFeature<Pitch>
            beforeEach(() => {
                pitch = note.pitch || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitch.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Pitch>>>(2))
            })

            it('uses the pitch parameter as the index', () => {
                expect(pitch.index)
                    .toBe(as.Ordinal<Array<Scalar<Pitch>>>(4))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', () => {
                expect(pitch.scalar)
                    .toBe(as.Scalar<Pitch>(0.666))
            })
        })
    })

    describe('example - rest', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(as.ContourElement<PitchDurationGainSustainScale>([ -1, 0.5, 2, 0.4, 0.7 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature<Duration>
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(as.Scalar<Duration>(0.5))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Duration>>>(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature<Gain>
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('has no gain', () => {
                expect(gain.scalar)
                    .toBe(as.Scalar<Gain>(0))
            })
        })
    })
})
