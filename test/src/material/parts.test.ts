// tslint:disable no-duplicate-string

import { NotePropertySpec, NoteSpec } from '@musical-patterns/compiler'
import { apply, Block, Cardinal, from, Maybe, Ordinal, product, random, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { buildHafuhafuWithPitchCircularityPart, buildPart, DeletionStyle, Direction } from '../../../src/indexForTest'

describe('parts', () => {
    describe('without pitch circularity', () => {
        let part: NoteSpec[] = []
        let expectedNotesCount: Cardinal = to.Cardinal(0)
        const TEST_ITERATION_LENGTH: Cardinal = to.Cardinal(Math.floor(random(32)))
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
                    const cellCount: Cardinal = to.Cardinal(testBlock.length)
                    expectedNotesCount = product(cellCount, TEST_ITERATION_LENGTH)
                })

                it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                    expect(to.Cardinal(part.length))
                        .toBe(expectedNotesCount)
                })

                it('keeps a constant gain on the even notes', () => {
                    for (let index: Ordinal = to.Ordinal(0); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).gainSpec
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
                    for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(2))) {
                        const gainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).gainSpec
                        if (!gainSpec) {
                            fail()
                        }
                        else {
                            testIsCloseTo(
                                gainSpec.scalar,
                                to.Scalar(Math.pow(2, 1 - (from.Ordinal(index) / from.Cardinal(expectedNotesCount))) - 1),
                            )
                        }
                    }
                })

                it('gradually decreases the duration of the notes from 2 to 1, increasing the tempo from 1/2x to 1x', () => {
                    for (let index: Ordinal = to.Ordinal(0); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                        const durationSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).durationSpec
                        if (!durationSpec) {
                            fail()
                        }
                        else {
                            testIsCloseTo(
                                durationSpec.scalar,
                                to.Scalar(Math.pow(2, 1 - (from.Ordinal(index) / from.Cardinal(expectedNotesCount)))),
                            )
                        }
                    }
                })

                it('keeps a constant sustain of the notes, slightly shorter than half the first duration', () => {
                    for (let index: Ordinal = to.Ordinal(0); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                        const sustainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).sustainSpec
                        if (!sustainSpec) {
                            fail()
                        }
                        else {
                            testIsCloseTo(sustainSpec.scalar, expectedSustainAmount)
                        }
                    }
                })
            })
        })
    })

    describe('with pitch circularity', () => {
        let part: NoteSpec[] = []
        let expectedNotesCount: Cardinal = to.Cardinal(0)
        const TEST_ITERATION_LENGTH: Cardinal = to.Cardinal(Math.floor(random(32)))

        const testBlocks: Block[] = [
            [ 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 2, 1, 1, 2 ],
            [ 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
        ].map(to.Block)

        testBlocks.forEach((testBlock: Block): void => {
            describe(`block ${testBlock}`, () => {
                describe('in', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_ITERATION_LENGTH, Direction.IN, DeletionStyle.FADE)
                        const cellCount: Cardinal = to.Cardinal(testBlock.length)
                        expectedNotesCount = product(cellCount, TEST_ITERATION_LENGTH)
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        expect(to.Cardinal(part.length))
                            .toBe(expectedNotesCount)
                    })

                    it('gradually increases the gain from silence to full (this one is linear because the between silence and 1 is artificially curved)', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).gainSpec
                            if (!gainSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    gainSpec.scalar,
                                    to.Scalar(from.Ordinal(index) / from.Cardinal(expectedNotesCount)),
                                )
                            }
                        }
                    })

                    it('gradually increases the pitch scalar from half to normal', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).pitchSpec
                            if (!pitchSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    pitchSpec.scalar,
                                    to.Scalar(Math.pow(2, (from.Ordinal(index) / from.Cardinal(expectedNotesCount)) - 1)),
                                )
                            }
                        }
                    })

                    it('gradually decreases the duration of the notes from 2 to 1, making the tempo change from 1/2x to 1x', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).durationSpec
                            if (!durationSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    durationSpec.scalar,
                                    to.Scalar(Math.pow(2, 1 - (from.Ordinal(index) / from.Cardinal(expectedNotesCount)))),
                                )
                            }
                        }
                    })

                    it('the sustain is always half of the duration', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    sustainSpec.scalar,
                                    apply.Scalar(durationSpec.scalar, to.Scalar(1 / 2)),
                                )
                            }
                        }
                    })
                })

                describe('out', () => {
                    beforeEach(() => {
                        part = buildHafuhafuWithPitchCircularityPart(testBlock, TEST_ITERATION_LENGTH, Direction.OUT, DeletionStyle.FADE)
                        const cellCount: Cardinal = to.Cardinal(testBlock.length)
                        expectedNotesCount = product(cellCount, TEST_ITERATION_LENGTH)
                    })

                    it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                        testIsCloseTo(to.Cardinal(part.length), apply.Scalar(expectedNotesCount, to.Scalar(2)))
                    })

                    it('gradually decreases the gain from full to silence', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2)))); index = apply.Translation(index, to.Translation(1))) {
                            const gainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).gainSpec
                            if (!gainSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    gainSpec.scalar,
                                    to.Scalar(Math.pow(2, 1 - (from.Ordinal(index) / from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2))))) - 1),
                                )
                            }
                        }
                    })

                    it('gradually increases the pitch scalar from normal to twice', () => {
                        for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2)))); index = apply.Translation(index, to.Translation(1))) {
                            const pitchSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).pitchSpec
                            if (!pitchSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    pitchSpec.scalar,
                                    to.Scalar(Math.pow(2, from.Ordinal(index) / from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2))))),
                                )
                            }
                        }
                    })

                    it('gradually decreases the duration of the notes from 1 to 0.5, making the tempo change from 1x to 2x', () => {
                        for (let index: Ordinal = to.Ordinal(0); index < to.Ordinal(from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2)))); index = apply.Translation(index, to.Translation(1))) {
                            const durationSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).durationSpec
                            if (!durationSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    durationSpec.scalar,
                                    to.Scalar(Math.pow(2, -(from.Ordinal(index) / from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2)))))),
                                )
                            }
                        }
                    })

                    it('the sustain is always half of the duration', () => {
                        for (let index: Ordinal = to.Ordinal(0); index < to.Ordinal(from.Cardinal(apply.Scalar(expectedNotesCount, to.Scalar(2)))); index = apply.Translation(index, to.Translation(1))) {
                            const sustainSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).sustainSpec
                            const durationSpec: Maybe<NotePropertySpec> = apply.Ordinal(part, index).durationSpec
                            if (!sustainSpec || !durationSpec) {
                                fail()
                            }
                            else {
                                testIsCloseTo(
                                    sustainSpec.scalar,
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
