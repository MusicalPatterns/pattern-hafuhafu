// tslint:disable no-duplicate-string

import { Note, NoteFeature, PitchDurationGainSustainScale } from '@musical-patterns/material'
import { to } from '@musical-patterns/utilities'
import { computeNote } from '../../../src/indexForTest'

describe('features', () => {
    describe('example one', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustainScale>([ 3, 0.5, 2, 0.5, 0.333 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(to.Scalar(0.5))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gain.scalar)
                    .toBe(to.Scalar(2))
            })
        })

        describe('pitch', () => {
            let pitch: NoteFeature
            beforeEach(() => {
                pitch = note.pitch || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitch.scaleIndex)
                    .toBe(to.Ordinal(2))
            })

            it('uses the pitch parameter', () => {
                expect(pitch.index)
                    .toBe(to.Ordinal(3))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', () => {
                expect(pitch.scalar)
                    .toBe(to.Scalar(0.333))
            })
        })
    })

    describe('example two', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustainScale>([ 4, 0.25, 1.5, 0.25, 0.666 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(to.Scalar(0.25))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gain.scalar)
                    .toBe(to.Scalar(1.5))
            })
        })

        describe('pitch index', () => {
            let pitch: NoteFeature
            beforeEach(() => {
                pitch = note.pitch || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitch.scaleIndex)
                    .toBe(to.Ordinal(2))
            })

            it('uses the pitch parameter as the index', () => {
                expect(pitch.index)
                    .toBe(to.Ordinal(4))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', () => {
                expect(pitch.scalar)
                    .toBe(to.Scalar(0.666))
            })
        })
    })

    describe('example - rest', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustainScale>([ -1, 0.5, 2, 0.4, 0.7 ]))
        })

        describe('duration', () => {
            let duration: NoteFeature
            beforeEach(() => {
                duration = note.duration || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(duration.scalar)
                    .toBe(to.Scalar(0.5))
            })

            it('uses the scale for durations', () => {
                expect(duration.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gain: NoteFeature
            beforeEach(() => {
                gain = note.gain || {}
            })

            it('has no gain', () => {
                expect(gain.scalar)
                    .toBe(to.Scalar(0))
            })
        })
    })
})
