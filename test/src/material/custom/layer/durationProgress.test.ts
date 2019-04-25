import { as, Cardinal, Ordinal, Scalar, Time, UnitScalar } from '@musical-patterns/utilities'
import { computeDurationProgress, HafuhafuMode, Layer, LayerIndex, Sieve } from '../../../../../src/indexForTest'

describe('duration progress', () => {
    describe('zeno mode', () => {
        const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(2)

        it('takes the existing iteration duration progress and adds to it the progress from the next element', () => {
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS: UnitScalar<UnitScalar> = as.UnitScalar<UnitScalar>(0)
            // tslint:disable-next-line no-any
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX: Ordinal<any> = as.Ordinal<any>(0)
            const ARBITRARY_TOTAL_DURATION_FOR_ASSERTION: Scalar<Time> = as.Scalar<Time>(88.888)
            const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE: Sieve = as.Multiple<LayerIndex>(999)
            const ARBITRARY_TOTAL_INDICES_FOR_ASSERTION: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(9949)

            const durationProgress: UnitScalar<UnitScalar> = computeDurationProgress({
                durationProgress: FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS,
                iterationIndex: FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX,
                layerCount,
                mode: HafuhafuMode.ZENO,
                reverse: false,
                sieve: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE,
                totalDuration: ARBITRARY_TOTAL_DURATION_FOR_ASSERTION,
                totalIndices: ARBITRARY_TOTAL_INDICES_FOR_ASSERTION,
            })

            const THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER: UnitScalar<UnitScalar> =
                as.UnitScalar<UnitScalar>(1 / 88.888)
            expect(durationProgress)
                .toEqual(THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER)
        })
    })
})
