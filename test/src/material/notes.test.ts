import { NotePropertySpec, NoteSpec } from '@musical-patterns/compiler'
import { to } from '@musical-patterns/utilities'
import { buildNoteSpec } from '../../../src/indexForTest'

describe('note specs', () => {
    describe('example one', () => {
        let noteSpec: NoteSpec
        beforeEach(() => {
            noteSpec = buildNoteSpec({
                cell: 3,
                duration: to.Scalar(0.5),
                gain: to.Scalar(2),
                pitch: to.Scalar(1),
                sustain: to.Scalar(0.5),
            })
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
                    .toBe(to.Index(1))
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

            it('uses the pitch parameter as the scalar', () => {
                expect(pitchSpec.scalar)
                    .toBe(to.Scalar(1))
            })

            it('uses the scale for pitches', () => {
                expect(pitchSpec.scaleIndex)
                    .toBe(to.Index(2))
            })

            it('uses the cell parameter, offset by one, as the index', () => {
                expect(pitchSpec.index)
                    .toBe(to.Index(4))
            })
        })
    })

    describe('example two', () => {
        let noteSpec: NoteSpec
        beforeEach(() => {
            noteSpec = buildNoteSpec({
                cell: 4,
                duration: to.Scalar(0.25),
                gain: to.Scalar(1.5),
                pitch: to.Scalar(0.375),
                sustain: to.Scalar(1),
            })
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
                    .toBe(to.Index(1))
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

            it('uses the pitch parameter as the scalar', () => {
                expect(pitchSpec.scalar)
                    .toBe(to.Scalar(0.375))
            })

            it('uses the scale for pitches', () => {
                expect(pitchSpec.scaleIndex)
                    .toBe(to.Index(2))
            })

            it('uses the cell parameter, offset by one, as the index', () => {
                expect(pitchSpec.index)
                    .toBe(to.Index(5))
            })
        })
    })
})
