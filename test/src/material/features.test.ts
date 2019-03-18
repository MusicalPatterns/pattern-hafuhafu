// tslint:disable no-duplicate-string

import { Note, NoteFeature } from '@musical-patterns/compiler'
import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { computeNote } from '../../../src/indexForTest'

describe('features', () => {
    describe('example one', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustain>([ 3, 0.5, 2, 0.5 ]))
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

            it('uses the pitch parameter, translated by one, as the index', () => {
                expect(pitch.index)
                    .toBe(to.Ordinal(2))
            })
        })
    })

    describe('example two', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustain>([ 4, 0.25, 1.5, 0.25 ]))
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

        describe('pitch', () => {
            let pitch: NoteFeature
            beforeEach(() => {
                pitch = note.pitch || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitch.scaleIndex)
                    .toBe(to.Ordinal(2))
            })

            it('uses the pitch parameter, translated by one, as the index', () => {
                expect(pitch.index)
                    .toBe(to.Ordinal(3))
            })
        })
    })

    describe('example - rest', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(to.ContourElement<PitchDurationGainSustain>([ 0, 0.5, 2 ]))
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
