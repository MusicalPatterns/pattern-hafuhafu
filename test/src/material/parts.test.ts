// tslint:disable:no-duplicate-string

import { NotePropertySpec, NoteSpec } from '@musical-patterns/compiler'
import { apply, Block, Count, from, Index, Maybe, Scalar, to } from '@musical-patterns/utilities'
import { buildHafuhafuWithPitchCircularityPart, buildPart, DeletionStyle, Direction } from '../../../src/indexForTest'

describe('parts', () => {
    describe('without pitch circularity', () => {
        let part: NoteSpec[] = []
        let expectedNotesCount: Count = to.Count(0)
        const TEST_ITERATION_LENGTH: Count = to.Count(Math.floor(Math.random() * 32))
        const expectedSustainAmount: Scalar = to.Scalar(1)

        const testBlocks: Block[] = [
            [ 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
        ].map(to.Block)

        testBlocks.forEach((testBlock: Block): void => {
            describe(`block ${testBlock}`, () => {
                beforeEach(() => {
                    part = buildPart(testBlock, TEST_ITERATION_LENGTH, DeletionStyle.FADE)
                    const cellCount: Count = to.Count(testBlock.length)
                    expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_ITERATION_LENGTH))
                })

                it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                    expect(to.Count(part.length))
                        .toBe(expectedNotesCount)
                })

                it('keeps a constant gain on the even notes', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).gainSpec
                        if (!gainSpec) {
                            fail()
                        }
                        else {
                            expect(gainSpec.scalar)
                                .toBe(to.Scalar(1))
                        }
                    }
                })

                it('gradually reduces the gain on the odd notes until they are silent', () => {
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).gainSpec
                        if (!gainSpec) {
                            fail()
                        }
                        else {
                            expect(gainSpec.scalar)
                                .toBe(
                                    to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount))) - 1),
                                )
                        }
                    }
                })

                it('gradually decreases the duration of the notes from 2 to 1, increasing the tempo from 1/2x to 1x', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                        const durationSpec: Maybe<NotePropertySpec> = apply.Index(part, i).durationSpec
                        if (!durationSpec) {
                            fail()
                        }
                        else {
                            expect(durationSpec.scalar)
                                .toBe(
                                    to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount)))),
                                )
                        }
                    }
                })

                it('keeps a constant sustain of the notes, slightly shorter than half the first duration', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                        const sustainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).sustainSpec
                        if (!sustainSpec) {
                            fail()
                        }
                        else {
                            expect(sustainSpec.scalar)
                                .toBe(expectedSustainAmount)
                        }
                    }
                })
            })
        })
    })

    describe('with pitch circularity', () => {
        let part: NoteSpec[] = []
        let expectedNotesCount: Count = to.Count(0)
        const TEST_ITERATION_LENGTH: Count = to.Count(Math.floor(Math.random() * 32))

        const testBlocks: Block[] = [
            [ 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
        ].map(to.Block)

        testBlocks.forEach((testBlock: Block): void => {
            describe(`block ${testBlock}`, () => {
                describe('in', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_ITERATION_LENGTH, Direction.IN)
                        const cellCount: Count = to.Count(testBlock.length)
                        expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_ITERATION_LENGTH))
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        expect(to.Count(part.length))
                            .toBe(expectedNotesCount)
                    })

                    it('gradually increases the gain from silence to full (this one is linear because the between silence and 1 is artificially curved)', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).gainSpec
                            if (!gainSpec) {
                                fail()
                            }
                            else {
                                expect(gainSpec.scalar)
                                    .toBe(to.Scalar(from.Index(i) / from.Count(expectedNotesCount)))
                            }
                        }
                    })

                    it('gradually increases the pitch scalar from half to normal', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = apply.Index(part, i).pitchSpec
                            if (!pitchSpec) {
                                fail()
                            }
                            else {
                                expect(pitchSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, (from.Index(i) / from.Count(expectedNotesCount)) - 1)),
                                    )
                            }
                        }
                    })

                    it('gradually decreases the duration of the notes from 2 to 1, making the tempo change from 1/2x to 1x', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = apply.Index(part, i).durationSpec
                            if (!durationSpec) {
                                fail()
                            }
                            else {
                                expect(durationSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount)))),
                                    )
                            }
                        }
                    })

                    it('the sustain is always half of the duration', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = apply.Offset(i, to.Offset(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = apply.Index(part, i).durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                expect(sustainSpec.scalar)
                                    .toBe(
                                        apply.Scalar(durationSpec.scalar, to.Scalar(1 / 2)),
                                    )
                            }
                        }
                    })
                })

                describe('out', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_ITERATION_LENGTH, Direction.OUT)
                        const cellCount: Count = to.Count(testBlock.length)
                        expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_ITERATION_LENGTH))
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        expect(to.Count(part.length))
                            .toBe(apply.Scalar(expectedNotesCount, to.Scalar(2)))
                    })

                    it('gradually decreases the gain from full to silence', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2)))); i = apply.Offset(i, to.Offset(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).gainSpec
                            if (!gainSpec) {
                                fail()
                            }
                            else {
                                expect(gainSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2))))) - 1),
                                    )
                            }
                        }
                    })

                    it('gradually increases the pitch scalar from normal to twice', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2)))); i = apply.Offset(i, to.Offset(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = apply.Index(part, i).pitchSpec
                            if (!pitchSpec) {
                                fail()
                            }
                            else {
                                expect(pitchSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, from.Index(i) / from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2))))),
                                    )
                            }
                        }
                    })

                    it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
                        for (let i: Index = to.Index(0); i < to.Index(from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2)))); i = apply.Offset(i, to.Offset(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = apply.Index(part, i).durationSpec
                            if (!durationSpec) {
                                fail()
                            }
                            else {
                                expect(durationSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, -(from.Index(i) / from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2)))))),
                                    )
                            }
                        }
                    })

                    it('the sustain is always half of the duration', () => {
                        for (let i: Index = to.Index(0); i < to.Index(from.Count(apply.Scalar(expectedNotesCount, to.Scalar(2)))); i = apply.Offset(i, to.Offset(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = apply.Index(part, i).sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = apply.Index(part, i).durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                expect(sustainSpec.scalar)
                                    .toBe(
                                        apply.Scalar(durationSpec.scalar, to.Scalar(1 / 2)),
                                    )
                            }
                        }
                    })
                })
            })
        })
    })

})
