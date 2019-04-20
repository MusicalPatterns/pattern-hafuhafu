import { as, Cardinal, Multiple, NormalScalar, Ordinal, Scalar, Time } from '@musical-patterns/utilities'
import { computeDurationProgress, HafuhafuMode } from '../../../../../src/indexForTest'

describe('duration progress', () => {
    describe('zeno mode', () => {
        const layerCount: Cardinal = as.Cardinal(2)

        it('takes the existing iteration duration progress and adds to it the progress from the next element', () => {
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS: NormalScalar<NormalScalar> = as.NormalScalar<NormalScalar>(0)
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX: Ordinal = as.Ordinal(0)
            const ARBITRARY_TOTAL_DURATION_FOR_ASSERTION: Scalar<Time> = as.Scalar<Time>(88.888)
            const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE: Multiple<Ordinal> = as.Multiple<Ordinal>(999)
            const ARBITRARY_TOTAL_INDICES_FOR_ASSERTION: Cardinal<Ordinal> = as.Cardinal<Ordinal>(9949)

            const durationProgress: NormalScalar<NormalScalar> = computeDurationProgress({
                durationProgress: FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS,
                iterationIndex: FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX,
                layerCount,
                mode: HafuhafuMode.ZENO,
                reverse: false,
                sieve: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE,
                totalDuration: ARBITRARY_TOTAL_DURATION_FOR_ASSERTION,
                totalIndices: ARBITRARY_TOTAL_INDICES_FOR_ASSERTION,
            })

            const THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER: NormalScalar<NormalScalar> =
                as.NormalScalar<NormalScalar>(1 / 88.888)
            expect(durationProgress)
                .toEqual(THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER)
        })
    })
})
