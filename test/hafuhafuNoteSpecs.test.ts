import {
    applyOffset,
    Count,
    from,
    Index,
    Maybe,
    NotePropertySpec,
    NoteSpec,
    Scalar,
    to,
} from '../../../src/indexForTest'
import { hafuhafuNoteSpecs, Rhythm, to as hafuhafuTo } from '../src/indexForTest'

describe('hafuhafu notes', () => {
    let result: NoteSpec[] = []
    let expectedNotesCount: Count = to.Count(0)
    const TEST_BAR_COUNT: Count = to.Count(32)
    const expectedSustainAmount: Scalar = to.Scalar(0.8)

    const testRhythms: Rhythm[] = [
        [ 0, 1, 0, 0, 1 ],
        [ 0, 0, 0, 1, 0, 0, 1 ],
        [ 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
    ].map(hafuhafuTo.Rhythm)

    testRhythms.forEach((testRhythm: Rhythm): void => {
        describe(`rhythm ${testRhythm}`, () => {
            beforeEach(() => {
                result = hafuhafuNoteSpecs(testRhythm, TEST_BAR_COUNT)
                const cellCount: Count = to.Count(testRhythm.length)
                expectedNotesCount = to.Count(from.Count(cellCount) * from.Count(TEST_BAR_COUNT))
            })

            it('returns a series of x notes, where x is the length of the rhythm times the count of bars', () => {
                expect(to.Count(result.length)).toBe(expectedNotesCount)
            })

            it('keeps a constant gain on the even notes', () => {
                for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(2))) {
                    const gainSpec: Maybe<NotePropertySpec> = result[ from.Index(i) ].gainSpec
                    if (!gainSpec) {
                        fail()
                    }
                    else {
                        expect(gainSpec.scalar).toBe(to.Scalar(1))
                    }
                }
            })

            it('gradually reduces the gain on the odd notes until they are silent', () => {
                for (let i: Index = to.Index(1); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(2))) {
                    const gainSpec: Maybe<NotePropertySpec> = result[ from.Index(i) ].gainSpec
                    if (!gainSpec) {
                        fail()
                    }
                    else {
                        expect(gainSpec.scalar).toBe(
                            to.Scalar(Math.pow(2, 1 - (from.Index(i) / from.Count(expectedNotesCount))) - 1),
                        )
                    }
                }
            })

            it('gradually decreases the duration of the notes from 2 to 1, increasing the tempo from 1/2x to 1x', () => {
                for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                    const durationSpec: Maybe<NotePropertySpec> = result[ from.Index(i) ].durationSpec
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

            it('keeps a constant sustain of the notes, slightly shorter than half the first duration', () => {
                for (let i: Index = to.Index(0); i < to.Index(from.Count(expectedNotesCount)); i = applyOffset(i, to.Offset(1))) {
                    const sustainSpec: Maybe<NotePropertySpec> = result[ from.Index(i) ].sustainSpec
                    if (!sustainSpec) {
                        fail()
                    }
                    else {
                        expect(sustainSpec.scalar).toBe(expectedSustainAmount)
                    }
                }
            })
        })
    })
})
