// tslint:disable no-duplicate-string

import {
    apply,
    Block,
    Cardinal,
    difference,
    finalIndexFromElementsTotal,
    from,
    INITIAL, insteadOf,
    isUndefined,
    Maybe,
    Multiple,
    NEXT,
    NormalScalar,
    Ordinal,
    PREVIOUS,
    Scalar,
    Time,
    to,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import { computeDuration, computeElementProgress, HafuhafuMode } from '../../../../../src/indexForTest'

describe('duration', () => {
    const ARBITRARY_TOTAL_INDICES: Cardinal<Ordinal> = to.Cardinal<Ordinal>(100)
    let reverse: boolean = false

    describe('zeno mode', () => {
        let sieve: Multiple<Ordinal>
        let layerCount: Cardinal = to.Cardinal(2)
        let indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact: Ordinal

        describe('when sieve is 2', () => {
            beforeEach(() => {
                sieve = to.Multiple<Ordinal>(2)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = to.Ordinal(10)
            })

            it('when an iteration begins, gives you the full duration 1', () => {
                const duration: Scalar<Time> = computeDuration({
                    iterationIndex: to.Ordinal(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(duration)
                    .toBe(to.Scalar<Time>(1))
            })

            it(
                `when an iteration is ending, gives you the duration 1/sieve (in this case 1/2), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes`,
                () => {
                    const duration: Scalar<Time> = computeDuration({
                        iterationIndex: insteadOf<Ordinal>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(duration)
                        .toBeCloseToTyped(to.Scalar<Time>(1 / 2))
                },
            )
        })

        describe('when sieve is 3', () => {
            beforeEach(() => {
                sieve = to.Multiple<Ordinal>(3)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = to.Ordinal(15)
            })

            it('when an iteration begins, gives you the full duration 1', () => {
                const duration: Scalar<Time> = computeDuration({
                    iterationIndex: to.Ordinal(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(duration)
                    .toBe(to.Scalar<Time>(1))
            })

            it(
                `when an iteration is ending, gives you the duration 1/sieve (in this case 1/3), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes`,
                () => {
                    const duration: Scalar<Time> = computeDuration({
                        iterationIndex: insteadOf<Ordinal>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(duration)
                        .toBeCloseToTyped(to.Scalar<Time>(1 / 3))
                },
            )
        })

        describe('when layer count is greater than the standard 2', () => {
            beforeEach(() => {
                sieve = to.Multiple<Ordinal>(2)
                layerCount = to.Cardinal(4)
                indexAfterTheFinalIndexGivenThisSetupJustToHelpProveThePointBecauseOtherwiseItWouldBeOneStepAwayFromExact = to.Ordinal(41)
            })

            it('when an iteration begins, gives you the full duration 1', () => {
                const duration: Scalar<Time> = computeDuration({
                    iterationIndex: to.Ordinal(0),
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve,
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(duration)
                    .toBe(to.Scalar<Time>(1))
            })

            it(
                `when an iteration is ending, gives you the duration 1/sieve (in this case 1/2), \
effectively increasing the tempo in proportion to counteract the fading out of the count of sieved notes; \
it does not scale by the layer count as I once thought, because the proportion of staying to leaving notes stays the same \
no matter the layer count`,
                () => {
                    const duration: Scalar<Time> = computeDuration({
                        iterationIndex: insteadOf<Ordinal>(finalIndexFromElementsTotal(ARBITRARY_TOTAL_INDICES)),
                        layerCount,
                        mode: HafuhafuMode.ZENO,
                        reverse,
                        sieve,
                        totalIndices: ARBITRARY_TOTAL_INDICES,
                    })

                    expect(duration)
                        .toBeCloseToTyped(
                            to.Scalar<Time>(1 / 2),
                            VERY_LOW_PRECISION,
                        )
                },
            )
        })

        describe('when layer count is 1', () => {
            it('the duration stays at 1, because there are not enough layers to affect any transformation', () => {
                const duration: Scalar<Time> = computeDuration({
                    iterationIndex: to.Ordinal(4),
                    layerCount: to.Cardinal(1),
                    mode: HafuhafuMode.ZENO,
                    reverse,
                    sieve: to.Multiple<Ordinal>(7),
                    totalIndices: ARBITRARY_TOTAL_INDICES,
                })

                expect(duration)
                    .toBe(to.Scalar<Time>(1))
            })
        })
    })

    describe('element progress', () => {
        let iterationKernel: Block
        let sieve: Multiple<Ordinal>
        let sieveFractalRepetitions: Cardinal

        const TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Cardinal<Ordinal> = to.Cardinal<Ordinal>(160)
        const FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Ordinal = insteadOf<Ordinal>(finalIndexFromElementsTotal(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))

        beforeEach(() => {
            iterationKernel = to.Block([ 1, 2, 1, 1, 2 ])
            sieve = to.Multiple<Ordinal>(2)
            sieveFractalRepetitions = to.Cardinal(80)
            reverse = false
        })

        it('the first element in the iteration has element progress 0', () => {
            const elementProgress: NormalScalar = computeElementProgress({
                iterationIndex: INITIAL,
                reverse,
                totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
            })

            expect(elementProgress)
                .toBe(to.NormalScalar(0))
        })

        it('the final element in the iteration almost has element progress almost 1 (the next one would be 1)', () => {
            const elementProgress: NormalScalar = computeElementProgress({
                iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                reverse,
                totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
            })

            expect(elementProgress)
                .toBe(to.NormalScalar(1 - (1 / from.Cardinal(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))))
        })

        it('each element progress result is greater than the one before it', () => {
            let previousIterationElementProgress: Maybe<NormalScalar> = undefined
            for (
                let iterationIndex: Ordinal = INITIAL;
                iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                iterationIndex = apply.Translation(iterationIndex, NEXT)
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

        describe('when reverse is true, the element progress instead counts down from 1 to 0', () => {
            beforeEach(() => {
                reverse = true
            })

            it('the first element in the iteration has element progress almost 1 (the reversed next one would be 1)', () => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: INITIAL,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(to.NormalScalar(1 - (1 / from.Cardinal(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))))
            })

            it('the penultimate element in the iteration has element progress almost 0 (the next one would be 0)', () => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: apply.Translation(FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2, PREVIOUS),
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(from.NormalScalar(elementProgress))
                    .toBeCloseTo(1 / from.Cardinal(TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))
            })

            it('the final element in the iteration has element progress 1 (because it has been cycled by one element to account for how durations are on the other side of their notes when they are reversed', () => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(to.NormalScalar(1))
            })

            it('each element progress result is less than the one before it', () => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal = INITIAL;
                    iterationIndex < FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = apply.Translation(iterationIndex, NEXT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        expect(from.NormalScalar(elementProgress))
                            .toBeLessThan(from.NormalScalar(previousIterationElementProgress))
                    }

                    previousIterationElementProgress = elementProgress
                }
            })

            it('each next element progress result increments by the same amount', () => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                let previousIterationElementProgressDifference: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal = INITIAL;
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = apply.Translation(iterationIndex, NEXT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_2_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        let iterationElementProgressDifference: Maybe<NormalScalar>
                        if (!isUndefined(previousIterationElementProgressDifference)) {
                            iterationElementProgressDifference = difference(
                                elementProgress,
                                previousIterationElementProgress,
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

        describe('when sieve is other than 2', () => {
            const TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Cardinal<Ordinal> = to.Cardinal<Ordinal>(240)
            const FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2: Ordinal = insteadOf<Ordinal>(finalIndexFromElementsTotal(TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2))

            beforeEach(() => {
                sieve = to.Multiple<Ordinal>(3)
            })

            it('the first element in the iteration has element progress 0', () => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: INITIAL,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(elementProgress)
                    .toBe(to.NormalScalar(0))
            })

            it('the final element in the iteration almost has element progress 1 (the next one would be 1)', () => {
                const elementProgress: NormalScalar = computeElementProgress({
                    iterationIndex: FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    reverse,
                    totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                })

                expect(from.NormalScalar(elementProgress))
                    .toBeCloseTo(1, VERY_LOW_PRECISION)
            })

            it('each element progress result is greater than the one before it', () => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal = INITIAL;
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = apply.Translation(iterationIndex, NEXT)
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

            it('each next element progress result increments by the same amount', () => {
                let previousIterationElementProgress: Maybe<NormalScalar> = undefined
                let previousIterationElementProgressDifference: Maybe<NormalScalar> = undefined
                for (
                    let iterationIndex: Ordinal = INITIAL;
                    iterationIndex <= FINAL_ITERATION_INDEX_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2;
                    iterationIndex = apply.Translation(iterationIndex, NEXT)
                ) {
                    const elementProgress: NormalScalar = computeElementProgress({
                        iterationIndex,
                        reverse,
                        totalIndices: TOTAL_INDICES_WHEN_SIEVE_3_SIEVE_FRACTAL_REPETITIONS_80_AND_LAYER_COUNT_2,
                    })

                    if (!isUndefined(previousIterationElementProgress)) {
                        let iterationElementProgressDifference: Maybe<NormalScalar>
                        if (!isUndefined(previousIterationElementProgressDifference)) {
                            iterationElementProgressDifference = difference(
                                elementProgress,
                                previousIterationElementProgress,
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
