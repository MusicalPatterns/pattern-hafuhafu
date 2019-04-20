import {
    Cardinal,
    indexOfFinalElement,
    INITIAL, insteadOf,
    length,
    Multiple,
    Ordinal,
    Scalar,
    slice,
    to, VERY_HIGH_PRECISION,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import { computeLayersProgresses, HafuhafuMode } from '../../../../../src/indexForTest'

describe('layers progresses', () => {
    describe('droste mode', () => {
        let layersProgresses: Scalar[][]
        const totalIndices: Cardinal<Ordinal> = to.Cardinal<Ordinal>(27)

        const layerCount: Cardinal = to.Cardinal(4)
        const sieve: Multiple<Ordinal> = to.Multiple<Ordinal>(3)

        beforeEach(() => {
            layersProgresses = computeLayersProgresses({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                reverse: false,
                sieve,
                totalIndices,
            })
        })

        it('each layer has a progress for each index', () => {
            layersProgresses.forEach((layerProgress: Scalar[]) => {
                expect(length(layerProgress))
                    .toBe(insteadOf<Cardinal, Scalar>(totalIndices))
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the last layer, the beyond layer, which just sticks at 1)`,
            () => {
                const firstLayerProgresses: Scalar[] = layersProgresses[ 0 ]
                expect(firstLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(0),
                        to.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                expect(secondLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1 / 3),
                        to.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                const thirdLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                expect(thirdLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(2 / 3),
                        to.Scalar(1),
                        VERY_LOW_PRECISION,
                    )

                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(to.Scalar(1))
            },
        )

        describe('when reverse is true', () => {
            it('progresses go from the same thing to the same thing per layer, just in the other direction (plus you have to switch the first and last elements)', () => {
                layersProgresses = computeLayersProgresses({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                const firstLayerProgresses: Scalar[] = layersProgresses[ 0 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(firstLayerProgresses, INITIAL, indexOfFinalElement(firstLayerProgresses))
                expect(firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1 / 3),
                        to.Scalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(secondLayerProgresses, INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(2 / 3),
                        to.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(thirdLayerProgresses, INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1),
                        to.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )

                const ALMOST_VERY_HIGH_PRECISION: number = 9
                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(to.Scalar(1), ALMOST_VERY_HIGH_PRECISION)
            })
        })
    })

    describe('zeno mode', () => {
        let layersProgresses: Scalar[][]
        const totalIndices: Cardinal<Ordinal> = to.Cardinal<Ordinal>(27)

        const layerCount: Cardinal = to.Cardinal(4)
        const sieve: Multiple<Ordinal> = to.Multiple<Ordinal>(3)

        beforeEach(() => {
            layersProgresses = computeLayersProgresses({
                layerCount,
                mode: HafuhafuMode.ZENO,
                reverse: false,
                sieve,
                totalIndices,
            })
        })

        it('each layer has a progress for each index', () => {
            layersProgresses.forEach((layerProgress: Scalar[]) => {
                expect(length(layerProgress))
                    .toBe(insteadOf<Cardinal, Scalar>(totalIndices))
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the first layer, the home layer, which just sticks at 0)`,
            () => {
                expect(layersProgresses[ 0 ])
                    .toBeHomogenous(to.Scalar(0))
                expect(layersProgresses[ 1 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(0),
                        to.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 2 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1 / 3),
                        to.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 3 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(2 / 3),
                        to.Scalar(1),
                        VERY_LOW_PRECISION,
                    )
            },
        )

        describe('when reverse is true', () => {
            it('progresses go from the same thing to the same thing per layer, just in the other direction (plus you have to switch the first and last elements)', () => {
                layersProgresses = computeLayersProgresses({
                    layerCount,
                    mode: HafuhafuMode.ZENO,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                expect(layersProgresses[ 0 ])
                    .toBeHomogenous(to.Scalar(0))

                const firstLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(firstLayerProgresses, INITIAL, indexOfFinalElement(firstLayerProgresses))
                expect(firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1 / 3),
                        to.Scalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(secondLayerProgresses, INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(2 / 3),
                        to.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: Scalar[] = layersProgresses[ 3 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(thirdLayerProgresses, INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.Scalar(1),
                        to.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
            })
        })

        describe('when layer count is one', () => {
            beforeEach(() => {
                layersProgresses = computeLayersProgresses({
                    layerCount: to.Cardinal(1),
                    mode: HafuhafuMode.ZENO,
                    reverse: false,
                    sieve,
                    totalIndices,
                })
            })

            it('the progress goes from one to zero', () => {
                expect(length(layersProgresses))
                    .toBe(to.Cardinal<Scalar[]>(1))
                expect(layersProgresses[ 0 ])
                    .toGoMonotonicallyFromValueToValue(
                        to.Scalar(0),
                        to.Scalar(1),
                        VERY_LOW_PRECISION,
                    )
            })
        })
    })
})
