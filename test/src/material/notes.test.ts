// tslint:disable no-duplicate-string

import { NotePropertySpec, NoteSpec } from '@musical-patterns/compiler'
import { PitchDurationGain } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { buildNoteSpec } from '../../../src/indexForTest'

describe('note specs', () => {
    describe('example one', () => {
        let noteSpec: NoteSpec
        beforeEach(() => {
            noteSpec = buildNoteSpec(to.ContourElement<PitchDurationGain>([ 3, 0.5, 2 ]))
        })

        describe('duration', () => {
            let durationSpec: NotePropertySpec
            beforeEach(() => {
                durationSpec = noteSpec.durationSpec || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(durationSpec.scalar)
                    .toBe(to.Scalar(0.5))
            })

            it('uses the scale for durations', () => {
                expect(durationSpec.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gainSpec: NotePropertySpec
            beforeEach(() => {
                gainSpec = noteSpec.gainSpec || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gainSpec.scalar)
                    .toBe(to.Scalar(2))
            })
        })

        describe('pitch', () => {
            let pitchSpec: NotePropertySpec
            beforeEach(() => {
                pitchSpec = noteSpec.pitchSpec || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitchSpec.scaleIndex)
                    .toBe(to.Ordinal(2))
            })

            it('uses the pitch parameter, translated by one, as the index', () => {
                expect(pitchSpec.index)
                    .toBe(to.Ordinal(2))
            })
        })
    })

    describe('example two', () => {
        let noteSpec: NoteSpec
        beforeEach(() => {
            noteSpec = buildNoteSpec(to.ContourElement<PitchDurationGain>([ 4, 0.25, 1.5 ]))
        })

        describe('duration', () => {
            let durationSpec: NotePropertySpec
            beforeEach(() => {
                durationSpec = noteSpec.durationSpec || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(durationSpec.scalar)
                    .toBe(to.Scalar(0.25))
            })

            it('uses the scale for durations', () => {
                expect(durationSpec.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gainSpec: NotePropertySpec
            beforeEach(() => {
                gainSpec = noteSpec.gainSpec || {}
            })

            it('uses the gain parameter as the scalar', () => {
                expect(gainSpec.scalar)
                    .toBe(to.Scalar(1.5))
            })
        })

        describe('pitch', () => {
            let pitchSpec: NotePropertySpec
            beforeEach(() => {
                pitchSpec = noteSpec.pitchSpec || {}
            })

            it('uses the scale for pitches', () => {
                expect(pitchSpec.scaleIndex)
                    .toBe(to.Ordinal(2))
            })

            it('uses the pitch parameter, translated by one, as the index', () => {
                expect(pitchSpec.index)
                    .toBe(to.Ordinal(3))
            })
        })
    })

    describe('example - rest', () => {
        let noteSpec: NoteSpec
        beforeEach(() => {
            noteSpec = buildNoteSpec(to.ContourElement<PitchDurationGain>([ 0, 0.5, 2 ]))
        })

        describe('duration', () => {
            let durationSpec: NotePropertySpec
            beforeEach(() => {
                durationSpec = noteSpec.durationSpec || {}
            })

            it('uses the duration parameter as the scalar', () => {
                expect(durationSpec.scalar)
                    .toBe(to.Scalar(0.5))
            })

            it('uses the scale for durations', () => {
                expect(durationSpec.scaleIndex)
                    .toBe(to.Ordinal(1))
            })
        })

        describe('gain', () => {
            let gainSpec: NotePropertySpec
            beforeEach(() => {
                gainSpec = noteSpec.gainSpec || {}
            })

            it('has no gain', () => {
                expect(gainSpec.scalar)
                    .toBe(to.Scalar(0))
            })
        })
    })
})
