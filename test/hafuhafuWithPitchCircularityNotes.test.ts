import { NotePropertySpec, NoteSpecs } from '../../../src/compile/types'
import applyOffset from '../../../src/utilities/applyOffset'
import applyScale from '../../../src/utilities/applyScale'
import * as from from '../../../src/utilities/from'
import { Count, Index } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { hafuhafuWithPitchCircularityNoteSpecs } from '../src/hafuhafuWithPitchCircularityNoteSpecs'
import { Direction, Rhythm } from '../src/types'
import * as hafuhafuTo from '../src/utilities/to'

describe('hafuhafu notes with pitch circularity', () => {
    let result: NoteSpecs = []
    let expectedNotesCount: Count = to.Count(0)
    const TEST_BAR_COUNT: Count = to.Count(32)

    const testRhythms: Rhythm[] = [
        [ 0, 1, 0, 0, 1 ],
        [ 0, 0, 0, 1, 0, 0, 1 ],
        [ 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
    ].map(hafuhafuTo.Rhythm)

    testRhythms.forEach((testRhythm: Rhythm): void => {
        describe(`rhythm ${testRhythm}`, () => {
            describe('in', () => {
                beforeEach(() => {
                    result = hafuhafuWithPitchCircularityNoteSpecs(testRhythm, TEST_BAR_COUNT, Direction.IN)
                    const cellCount: Count = to.Count(testRhythm.length)
                    expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
                })

                it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
                    expect(to.Count(result.length)).toBe(expectedNotesCount)
                })

                it('gradually increases the gain from silence to full (this one is linear because the between silence and 1 is artificially curved)', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const gainSpec: NotePropertySpec | undefined = result[ from.Index(i) ].gainSpec
                        if (!gainSpec) {
                            fail()
                        }
                        else {
                            expect(gainSpec.scalar).toBe(to.Scalar(from.Index(i) / from.Count(expectedNotesCount)))
                        }
                    }
                })

                it('gradually increases the pitch scalar from half to normal', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const pitchSpec: NotePropertySpec | undefined = result[ from.Index(i) ].pitchSpec
                        if (!pitchSpec) {
                            fail()
                        }
                        else {
                            expect(pitchSpec.scalar).toBe(
                                to.Scalar(Math.pow(2, (from.Index(i) / from.Count(expectedNotesCount)) - 1)),
                            )
                        }
                    }
                })

                it('gradually decreases the duration of the notes from 2 to 1, making the tempo change from 1/2x to 1x', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const durationSpec: NotePropertySpec | undefined = result[ from.Index(i) ].durationSpec
                        if (!durationSpec) {
                            fail()
                        }
                        else {
                            expect(durationSpec.scalar).toBe(
                                to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount)))),
                            )
                        }
                    }
                })

                it('the sustain is always half of the duration', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const sustainSpec: NotePropertySpec | undefined = result[ from.Index(i) ].sustainSpec
                        const durationSpec: NotePropertySpec | undefined = result[ from.Index(i) ].durationSpec
                        if (!sustainSpec || !durationSpec) {
                            fail()
                        }
                        else {
                            expect(sustainSpec.scalar).toBe(
                                applyScale(durationSpec.scalar, to.Scalar(1 / 2)),
                            )
                        }
                    }
                })
            })

            describe('out', () => {
                beforeEach(() => {
                    result = hafuhafuWithPitchCircularityNoteSpecs(testRhythm, TEST_BAR_COUNT, Direction.OUT)
                    const cellCount: Count = to.Count(testRhythm.length)
                    expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
                })

                it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
                    expect(to.Count(result.length)).toBe(applyScale(expectedNotesCount, to.Scalar(2)))
                })

                it('gradually decreases the gain from full to silence', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                        const gainSpec: NotePropertySpec | undefined = result[ from.Index(i) ].gainSpec
                        if (!gainSpec) {
                            fail()
                        }
                        else {
                            expect(gainSpec.scalar).toBe(
                                to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2))))) - 1),
                            )
                        }
                    }
                })

                it('gradually increases the pitch scalar from normal to twice', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                        const pitchSpec: NotePropertySpec | undefined = result[ from.Index(i) ].pitchSpec
                        if (!pitchSpec) {
                            fail()
                        }
                        else {
                            expect(pitchSpec.scalar).toBe(
                                to.Scalar(Math.pow(2, from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2))))),
                            )
                        }
                    }
                })

                it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                        const durationSpec: NotePropertySpec | undefined = result[ from.Index(i) ].durationSpec
                        if (!durationSpec) {
                            fail()
                        }
                        else {
                            expect(durationSpec.scalar).toBe(
                                to.Scalar(Math.pow(2, -(from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2)))))),
                            )
                        }
                    }
                })

                it('the sustain is always half of the duration', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                        const sustainSpec: NotePropertySpec | undefined = result[ from.Index(i) ].sustainSpec
                        const durationSpec: NotePropertySpec | undefined = result[ from.Index(i) ].durationSpec
                        if (!sustainSpec || !durationSpec) {
                            fail()
                        }
                        else {
                            expect(sustainSpec.scalar).toBe(
                                applyScale(durationSpec.scalar, to.Scalar(1 / 2)),
                            )
                        }
                    }
                })
            })
        })
    })
})
