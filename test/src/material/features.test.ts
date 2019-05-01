// tslint:disable no-duplicate-string

import { Feature, Note, PitchValueIntensityEnvelopeScale, Scale } from '@musical-patterns/material'
import { as, Intensity, Pitch, Scalar, Value } from '@musical-patterns/utilities'
import { computeNote } from '../../../src/indexForTest'

describe('features', () => {
    describe('example one', () => {
        let note: Note
        beforeEach(() => {
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ 3, 0.5, 2, 0.5, 0.333 ]))
        })

        describe('value', () => {
            let value: Feature<Value>
            beforeEach(() => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', () => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.5))
            })

            it('uses the scale for values', () => {
                expect(value.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Value>>>(1))
            })
        })

        describe('intensity', () => {
            let intensity: Feature<Intensity>
            beforeEach(() => {
                intensity = note.intensity || {}
            })

            it('uses the intensity parameter as the scalar', () => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(2))
            })
        })

        describe('pitch', () => {
            let pitch: Feature<Pitch>
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
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ 4, 0.25, 1.5, 0.25, 0.666 ]))
        })

        describe('value', () => {
            let value: Feature<Value>
            beforeEach(() => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', () => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.25))
            })

            it('uses the scale for values', () => {
                expect(value.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Value>>>(1))
            })
        })

        describe('intensity', () => {
            let intensity: Feature<Intensity>
            beforeEach(() => {
                intensity = note.intensity || {}
            })

            it('uses the intensity parameter as the scalar', () => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(1.5))
            })
        })

        describe('pitch index', () => {
            let pitch: Feature<Pitch>
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
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ -1, 0.5, 2, 0.4, 0.7 ]))
        })

        describe('value', () => {
            let value: Feature<Value>
            beforeEach(() => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', () => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.5))
            })

            it('uses the scale for values', () => {
                expect(value.scaleIndex)
                    .toBe(as.Ordinal<Array<Scale<Value>>>(1))
            })
        })

        describe('intensity', () => {
            let intensity: Feature<Intensity>
            beforeEach(() => {
                intensity = note.intensity || {}
            })

            it('has no intensity', () => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(0))
            })
        })
    })
})
