import {
    applyOffset,
    applyScale,
    Block,
    Count,
    from,
    Index,
    Maybe,
    NotePropertySpec,
    Part,
    Scalar,
    to,
} from '../../../../../src/indexForTest'
import {
    buildHafuhafuPart,
    buildHafuhafuWithPitchCircularityPart,
    Direction,
} from '../../../src/indexForTest'

describe('hafuhafu parts', () => {
    describe('without pitch circularity', () => {
        let part: Part = []
        let expectedNotesCount: Count = to.Count(0)
        const TEST_BAR_COUNT: Count = to.Count(32)
        const expectedSustainAmount: Scalar = to.Scalar(0.9)

        const testBlocks: Block[] = [
            [ 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
        ].map(to.Block)

        testBlocks.forEach((testBlock: Block): void => {
            describe(`block ${testBlock}`, () => {
                beforeEach(() => {
                    part = buildHafuhafuPart(testBlock, TEST_BAR_COUNT)
                    const cellCount: Count = to.Count(testBlock.length)
                    expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
                })

                it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                    expect(to.Count(part.length))
                        .toBe(expectedNotesCount)
                })

                it('keeps a constant gain on the even notes', () => {
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].gainSpec
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
                    for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].gainSpec
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
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const durationSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].durationSpec
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
                    for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                        const sustainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].sustainSpec
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
        let part: Part = []
        let expectedNotesCount: Count = to.Count(0)
        const TEST_BAR_COUNT: Count = to.Count(32)

        const testBlocks: Block[] = [
            [ 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
        ].map(to.Block)

        testBlocks.forEach((testBlock: Block): void => {
            describe(`block ${testBlock}`, () => {
                describe('in', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_BAR_COUNT, Direction.IN)
                        const cellCount: Count = to.Count(testBlock.length)
                        expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        expect(to.Count(part.length))
                            .toBe(expectedNotesCount)
                    })

                    it('gradually increases the gain from silence to full (this one is linear because the between silence and 1 is artificially curved)', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].gainSpec
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
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].pitchSpec
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
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].durationSpec
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
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                expect(sustainSpec.scalar)
                                    .toBe(
                                        applyScale(durationSpec.scalar, to.Scalar(1 / 2)),
                                    )
                            }
                        }
                    })
                })

                describe('out', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_BAR_COUNT, Direction.OUT)
                        const cellCount: Count = to.Count(testBlock.length)
                        expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        expect(to.Count(part.length))
                            .toBe(applyScale(expectedNotesCount, to.Scalar(2)))
                    })

                    it('gradually decreases the gain from full to silence', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].gainSpec
                            if (!gainSpec) {
                                fail()
                            }
                            else {
                                expect(gainSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2))))) - 1),
                                    )
                            }
                        }
                    })

                    it('gradually increases the pitch scalar from normal to twice', () => {
                        for (let i: Index = to.Index(1); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].pitchSpec
                            if (!pitchSpec) {
                                fail()
                            }
                            else {
                                expect(pitchSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2))))),
                                    )
                            }
                        }
                    })

                    it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
                        for (let i: Index = to.Index(0); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].durationSpec
                            if (!durationSpec) {
                                fail()
                            }
                            else {
                                expect(durationSpec.scalar)
                                    .toBe(
                                        to.Scalar(Math.pow(2, -(from.Index(i) / from.Count(applyScale(expectedNotesCount, to.Scalar(2)))))),
                                    )
                            }
                        }
                    })

                    it('the sustain is always half of the duration', () => {
                        for (let i: Index = to.Index(0); i < to.Index(from.Count(applyScale(expectedNotesCount, to.Scalar(2)))); i = applyOffset(i, to.Offset(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = part[ from.Index(i) ].durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                expect(sustainSpec.scalar)
                                    .toBe(
                                        applyScale(durationSpec.scalar, to.Scalar(1 / 2)),
                                    )
                            }
                        }
                    })
                })
            })
        })
    })

})
