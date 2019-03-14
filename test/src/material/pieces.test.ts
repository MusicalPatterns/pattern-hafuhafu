// tslint:disable no-duplicate-string

import { PitchDurationGain } from '@musical-patterns/pattern'
import {
    apply,
    Block,
    Cardinal,
    ContourPiece,
    floor,
    from,
    INITIAL,
    NEXT,
    Ordinal,
    product,
    random,
    testIsCloseTo,
    to,
    totalElements,
} from '@musical-patterns/utilities'
import { computePiece, DeletionStyle, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('pieces', () => {
    let piece: ContourPiece<PitchDurationGain> = to.ContourPiece<PitchDurationGain>([])
    let expectedNotesCount: Cardinal = to.Cardinal(0)
    const TEST_ITERATION_LENGTH: Cardinal = to.Cardinal(floor(random(32)))

    const testBlocks: Block[] = [
        [ 1, 2, 1, 1, 2 ],
        [ 1, 1, 1, 2, 1, 1, 2 ],
        [ 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
    ].map(to.Block)

    const specs: HafuhafuSpecs = {
        ...initialSpecs,
        deletionStyle: DeletionStyle.FADE,
        iterationLength: TEST_ITERATION_LENGTH,
        reversed: false,
    }

    testBlocks.forEach((testBlock: Block): void => {
        describe(`block ${testBlock}`, () => {
            beforeEach(() => {
                piece = computePiece(testBlock, specs)
                const cellCount: Cardinal = totalElements(testBlock)
                expectedNotesCount = product(cellCount, TEST_ITERATION_LENGTH)
            })

            it('returns a series of x notes, where x is the length of the block times the count of bars', () => {
                expect(to.Cardinal(piece.length))
                    .toBe(expectedNotesCount)
            })

            it('keeps a constant gain on the even notes', () => {
                for (let index: Ordinal = INITIAL; index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(2))) {
                    const gain: number = apply.Ordinal(piece, index)[ 2 ]

                    expect(gain)
                        .toBe(1)
                }
            })

            it('gradually reduces the gain on the odd notes until they are silent', () => {
                for (let index: Ordinal = to.Ordinal(1); index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, to.Translation(2))) {
                    const gain: number = apply.Ordinal(piece, index)[ 2 ]

                    testIsCloseTo(
                        gain,
                        apply.Power(2, to.Power(1 - (from.Ordinal(index) / from.Cardinal(expectedNotesCount)))) - 1,
                    )
                }
            })

            it('gradually decreases the duration of the notes from 2 to 1, increasing the tempo from 1/2x to 1x', () => {
                for (let index: Ordinal = INITIAL; index < to.Ordinal(from.Cardinal(expectedNotesCount)); index = apply.Translation(index, NEXT)) {
                    const duration: number = apply.Ordinal(piece, index)[ 1 ]
                    testIsCloseTo(
                        duration,
                        apply.Power(2, to.Power(1 - (from.Ordinal(index) / from.Cardinal(expectedNotesCount)))),
                    )
                }
            })
        })
    })
})
