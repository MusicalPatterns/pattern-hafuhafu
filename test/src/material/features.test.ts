// tslint:disable no-duplicate-string

import { Feature, Note, PitchValueIntensityEnvelopeScale, Scale } from '@musical-patterns/material'
import { as, Intensity, Pitch, Scalar, Value } from '@musical-patterns/utilities'
import { computeNote } from '../../../src/indexForTest'

describe('features', (): void => {
    describe('example one', (): void => {
        let note: Note
        beforeEach((): void => {
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ 3, 0.5, 2, 0.5, 0.333 ]))
        })

        describe('value', (): void => {
            let value: Feature<Value>
            beforeEach((): void => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', (): void => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.5))
            })
        })

        describe('intensity', (): void => {
            let intensity: Feature<Intensity>
            beforeEach((): void => {
                intensity = note.intensity || {}
            })

            it('uses the intensity parameter as the scalar', (): void => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(2))
            })
        })

        describe('pitch', (): void => {
            let pitch: Feature<Pitch>
            beforeEach((): void => {
                pitch = note.pitch || {}
            })

            it('uses the pitch parameter', (): void => {
                expect(pitch.index)
                    .toBe(as.Ordinal<Array<Scalar<Pitch>>>(3))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', (): void => {
                expect(pitch.scalar)
                    .toBe(as.Scalar<Pitch>(0.333))
            })
        })
    })

    describe('example two', (): void => {
        let note: Note
        beforeEach((): void => {
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ 4, 0.25, 1.5, 0.25, 0.666 ]))
        })

        describe('value', (): void => {
            let value: Feature<Value>
            beforeEach((): void => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', (): void => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.25))
            })
        })

        describe('intensity', (): void => {
            let intensity: Feature<Intensity>
            beforeEach((): void => {
                intensity = note.intensity || {}
            })

            it('uses the intensity parameter as the scalar', (): void => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(1.5))
            })
        })

        describe('pitch index', (): void => {
            let pitch: Feature<Pitch>
            beforeEach((): void => {
                pitch = note.pitch || {}
            })

            it('uses the pitch parameter as the index', (): void => {
                expect(pitch.index)
                    .toBe(as.Ordinal<Array<Scalar<Pitch>>>(4))
            })

            it('uses (abuses?) the scale element as a delivery mechanism for a second pitch-related amount - its scalar', (): void => {
                expect(pitch.scalar)
                    .toBe(as.Scalar<Pitch>(0.666))
            })
        })
    })

    describe('example - rest', (): void => {
        let note: Note
        beforeEach((): void => {
            note = computeNote(as.ContourElement<PitchValueIntensityEnvelopeScale>([ -1, 0.5, 2, 0.4, 0.7 ]))
        })

        describe('value', (): void => {
            let value: Feature<Value>
            beforeEach((): void => {
                value = note.value || {}
            })

            it('uses the value parameter as the scalar', (): void => {
                expect(value.scalar)
                    .toBe(as.Scalar<Value>(0.5))
            })
        })

        describe('intensity', (): void => {
            let intensity: Feature<Intensity>
            beforeEach((): void => {
                intensity = note.intensity || {}
            })

            it('has no intensity', (): void => {
                expect(intensity.scalar)
                    .toBe(as.Scalar<Intensity>(0))
            })
        })
    })
})
