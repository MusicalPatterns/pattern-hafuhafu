// tslint:disable no-duplicate-string

import {
    as,
    Block,
    Cardinal,
    DECREMENT,
    finalIndexFromElementsTotal,
    INCREMENT,
    INITIAL,
    insteadOf,
    isUndefined,
    Maybe,
    NormalScalar,
    Ordinal,
    Scalar,
    use,
    Value,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import {
    computeElementProgress,
    computeValue,
    HafuhafuMode,
    Layer,
    LayerIndex,
    Sieve,
} from '../../../../../src/indexForTest'

describe('value', (): void => {
    const ARBITRARY_TOTAL_INDICES: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(100)
    let reverse: boolean = false

    describe('zeno mode', (): void => {
        let sieve: Sieve
        let layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(2)
        let indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact: Ordinal

        describe('when sieve is 2', (): void => {
            beforeEach((): void => {
                sieve = as.Multiple<LayerIndex>(2)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = as.Ordinal(10)
            })

            it('when an iteration begins, gives you the full value 1', (): void => {
                const value: Scalar<Value> = computeValue({
                    iterationIndex: as.Ordinal<Block>(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(value)
                    .toBe(as.Scalar<Value>(1))
            })

            it(
                `when an iteration is ending, gives you the value 1/sieve (in this case 1/2), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes`,
                (): void => {
                    const value: Scalar<Value> = computeValue({
                        iterationIndex: insteadOf<Ordinal, Block>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(value)
                        .toBeCloseToTyped(as.Scalar<Value>(1 / 2))
                },
            )
        })

        describe('when sieve is 3', (): void => {
            beforeEach((): void => {
                sieve = as.Multiple<LayerIndex>(3)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = as.Ordinal(15)
            })

            it('when an iteration begins, gives you the full value 1', (): void => {
                const value: Scalar<Value> = computeValue({
                    iterationIndex: as.Ordinal<Block>(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(value)
                    .toBe(as.Scalar<Value>(1))
            })

            it(
                `when an iteration is ending, gives you the value 1/sieve (in this case 1/3), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes`,
                (): void => {
                    const value: Scalar<Value> = computeValue({
                        iterationIndex: insteadOf<Ordinal, Block>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(value)
                        .toBeCloseToTyped(as.Scalar<Value>(1 / 3))
                },
            )
        })

        describe('when layer count is greater than the standard 2', (): void => {
            beforeEach((): void => {
                sieve = as.Multiple<LayerIndex>(2)
                layerCount = as.Cardinal<Layer[]>(4)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = as.Ordinal(41)
            })

            it('when an iteration begins, gives you the full value 1', (): void => {
                const value: Scalar<Value> = computeValue({
                    iterationIndex: as.Ordinal<Block>(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(value)
                    .toBe(as.Scalar<Value>(1))
            })

            it(
                `when an iteration is ending, gives you the value 1/sieve (in this case 1/2), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes; \
it does not scale by the layer count as I once thought, because the proportion of staying to leaving notes stays the same \
no matter the layer count`,
                (): void => {
                    const value: Scalar<Value> = computeValue({
                        iterationIndex: insteadOf<Ordinal, Block>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(value)
                        .toBeCloseToTyped(
                            as.Scalar<Value>(1 / 2),
                            VERY_LOW_PRECISION,
                        )
                },
            )
        })

        describe('when layer count is 1', (): void => {
            it('the value stays at 1, because there are not enough layers to affect any transformation', (): void => {
                const value: Scalar<Value> = computeValue({
                    iterationIndex: as.Ordinal<Block>(4),
                    layerCount: as.Cardinal<Layer[]>(1),
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve: as.Multiple<LayerIndex>(7),
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(value)
                    .toBe(as.Scalar<Value>(1))
            })
        })
    })

    describe('element progress', (): void => {
        let iterationKernel: Block
        let sieve: Sieve
        let sieveFractalRepetitions: Cardinal

        const TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(160)
        const FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Ordinal<Block> = insteadOf<Ordinal, Block>(finalIndexFromElementsTotal(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))

        beforeEach((): void => {
            iterationKernel = as.Block([ 1, 2, 1, 1, 2 ])
            sieve = as.Multiple<LayerIndex>(2)
            sieveFractalRepetitions = as.Cardinal(80)
            reverse = false
        })

        it('the first element in the iteration has element progress 0', (): void => {
            const elementProgress: NormalScalar = computeElementProgress({
                iterationIndex: insteadOf<Ordinal, Block>(INITIAL),
                reverse,
                totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
            })

            expect(elementProgress)
                .toBe(as.NormalScalar(0))
        })

        it('the final element in the iteration almost has element progress almost 1 (the next one would be 1)', (): void => {
            const elementProgress: NormalScalar = computeElementProgress({
                iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                reverse,
                totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
            })

            expect(elementProgress)
                .toBe(as.NormalScalar(1 - (1 / as.number(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))))
        })

        it('each element progress result is greater than the one before it', (): void => {
            let previousIterationElementProgress: Maybe<NormalScalar> = undefined
            for (
                let iterationIndex: Ordinal<Block> = insteadOf<Ordinal, Block>(INITIAL);
                iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                iterationIndex = use.Cardinal(iterationIndex, INCREMENT)
            ) {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                if (!isUndefined(previousIterationElementProgress)) {
                    expect(elementProgress)
                        .toBeGreaterThanTyped(previousIterationElementProgress)
                }

                previousIterationElementProgress = elementProgress
            }
        })

        describe('when reverse is true, the element progress instead counts down from 1 to 0', (): void => {
            beforeEach((): void => {
                reverse = true
            })

            it('the first element in the iteration has element progress almost 1 (the reversed next one would be 1)', (): void => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: insteadOf<Ordinal, Block>(INITIAL),
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(as.NormalScalar(1 - (1 / as.number(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))))
            })

            it('the penultimate element in the iteration has element progress almost 0 (the next one would be 0)', (): void => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: use.Cardinal(FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2, DECREMENT),
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(as.number(elementProgress))
                    .toBeCloseTo(1 / as.number(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))
            })

            it('the final element in the iteration has element progress 1 (because it has been cycled by one element to account for how values are on the other side of their notes when they are reversed', (): void => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(as.NormalScalar(1))
            })

            it('each element progress result is less than the one before it', (): void => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal<Block> = insteadOf<Ordinal, Block>(INITIAL);
                    iterationIndex < FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = use.Cardinal(iterationIndex, INCREMENT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        expect(elementProgress)
                            .toBeLessThanTyped(previousIterationElementProgress)
                    }

                    previousIterationElementProgress = elementProgress
                }
            })

            it('each next element progress result increments by the same amount', (): void => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                let previousIterationElementProgressDifference: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal<Block> = insteadOf<Ordinal, Block>(INITIAL);
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = use.Cardinal(iterationIndex, INCREMENT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        let iterationElementProgressDifference: Maybe<NormalScalar>
                        if (!isUndefined(previousIterationElementProgressDifference)) {
                            iterationElementProgressDifference = as.NormalScalar(
                                as.number(elementProgress) - as.number(previousIterationElementProgress),
                            )
                            expect(iterationElementProgressDifference)
                                .toEqual(previousIterationElementProgressDifference)
                        }
                        previousIterationElementProgressDifference = iterationElementProgressDifference
                    }

                    previousIterationElementProgress = elementProgress
                }
            })
        })

        describe('when sieve is other than 2', (): void => {
            const TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(240)
            const FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Ordinal<Block> = insteadOf<Ordinal, Block>(finalIndexFromElementsTotal(TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))

            beforeEach((): void => {
                sieve = as.Multiple<LayerIndex>(3)
            })

            it('the first element in the iteration has element progress 0', (): void => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: insteadOf<Ordinal, Block>(INITIAL),
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(as.NormalScalar(0))
            })

            it('the final element in the iteration almost has element progress 1 (the next one would be 1)', (): void => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(as.number(elementProgress))
                    .toBeCloseTo(1, VERY_LOW_PRECISION)
            })

            it('each element progress result is greater than the one before it', (): void => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal<Block> = insteadOf<Ordinal, Block>(INITIAL);
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = use.Cardinal(iterationIndex, INCREMENT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        expect(elementProgress)
                            .toBeGreaterThanTyped(previousIterationElementProgress)
                    }

                    previousIterationElementProgress = elementProgress
                }
            })

            it('each next element progress result increments by the same amount', (): void => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                let previousIterationElementProgressDifference: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal<Block> = insteadOf<Ordinal, Block>(INITIAL);
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = use.Cardinal(iterationIndex, INCREMENT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        let iterationElementProgressDifference: Maybe<NormalScalar>
                        if (!isUndefined(previousIterationElementProgressDifference)) {
                            iterationElementProgressDifference = as.NormalScalar(
                                as.number(elementProgress) - as.number(previousIterationElementProgress),
                            )
                            expect(iterationElementProgressDifference)
                                .toEqual(previousIterationElementProgressDifference)
                        }
                        previousIterationElementProgressDifference = iterationElementProgressDifference
                    }

                    previousIterationElementProgress = elementProgress
                }
            })
        })
    })
})
