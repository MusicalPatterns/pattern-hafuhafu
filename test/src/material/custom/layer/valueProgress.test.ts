import { as, Cardinal, NormalScalar, Ordinal, Scalar, Value } from '@musical-patterns/utilities'
import { computeValueProgress, HafuhafuMode, Layer, LayerIndex, Sieve } from '../../../../../src/indexForTest'

describe('value progress', (): void => {
    describe('zeno mode', (): void => {
        const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(2)

        it('takes the existing iteration value progress and adds to it the progress from the next element', (): void => {
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS: NormalScalar<NormalScalar> = as.NormalScalar<NormalScalar>(0)
            // tslint:disable-next-line no-any
            const FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX: Ordinal<any> = as.Ordinal<any>(0)
            const ARBITRARY_TOTAL_VALUE_FOR_ASSERTION: Scalar<Value> = as.Scalar<Value>(88.888)
            const IRRELEVANT_FOR_THESE_PURPOSES_SIEVE: Sieve = as.Multiple<LayerIndex>(999)
            const ARBITRARY_TOTAL_INDICES_FOR_ASSERTION: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(9949)

            const valueProgress: NormalScalar<NormalScalar> = computeValueProgress({
                iterationIndex: FOR_SIMPLICITY_TESTING_THE_BEGINNING_INDEX,
                layerCount,
                mode: HafuhafuMode.ZENO,
                reverse: false,
                sieve: IRRELEVANT_FOR_THESE_PURPOSES_SIEVE,
                totalIndices: ARBITRARY_TOTAL_INDICES_FOR_ASSERTION,
                totalValue: ARBITRARY_TOTAL_VALUE_FOR_ASSERTION,
                valueProgress: FOR_SIMPLICITY_TESTING_THE_BEGINNING_PROGRESS,
            })

            const THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER: NormalScalar<NormalScalar> =
                as.NormalScalar<NormalScalar>(1 / 88.888)
            expect(valueProgress)
                .toEqual(THE_FIRST_ELEMENT_HAS_DURATION_1_SO_PROGRESS_IS_SIMPLY_1_INTO_THE_TOTAL_NEEDED_TO_COVER)
        })
    })
})
