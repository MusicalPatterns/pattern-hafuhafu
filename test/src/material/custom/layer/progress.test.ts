import {
    as,
    Cardinal,
    indexOfFinalElement,
    INITIAL,
    insteadOf,
    length,
    Scalar,
    slice,
    UnitScalar,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import { computeLayersProgresses, HafuhafuMode, Layer, LayerIndex, Sieve } from '../../../../../src/indexForTest'

describe('layers progresses', () => {
    describe('droste mode', () => {
        let layersProgresses: Scalar[][]
        const totalIndices: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(27)

        const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(4)
        const sieve: Sieve = as.Multiple<LayerIndex>(3)

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
                    .toBe(insteadOf<Cardinal, Scalar[]>(totalIndices))
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the last layer, the beyond layer, which just sticks at 1)`,
            () => {
                const firstLayerProgresses: Scalar[] = layersProgresses[ 0 ]
                expect(firstLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(0),
                        as.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                expect(secondLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(1 / 3),
                        as.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                const thirdLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                expect(thirdLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(2 / 3),
                        as.Scalar(1),
                        VERY_LOW_PRECISION,
                    )

                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(as.Scalar(1))
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
                        as.Scalar(1 / 3),
                        as.Scalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(secondLayerProgresses, INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(2 / 3),
                        as.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(thirdLayerProgresses, INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(1),
                        as.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )

                const ALMOST_VERY_HIGH_PRECISION: number = 9
                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(as.Scalar(1), ALMOST_VERY_HIGH_PRECISION)
            })
        })
    })

    describe('zeno mode', () => {
        let layersProgresses: Scalar[][]
        const totalIndices: Cardinal<LayerIndex[]> = as.Cardinal<LayerIndex[]>(27)

        const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(4)
        const sieve: Sieve = as.Multiple<LayerIndex>(3)

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
                    .toBe(insteadOf<Cardinal, Scalar[]>(totalIndices))
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the first layer, the home layer, which just sticks at 0)`,
            () => {
                expect(layersProgresses[ 0 ])
                    .toBeHomogenous(as.Scalar(0))
                expect(layersProgresses[ 1 ])
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(0),
                        as.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 2 ])
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(1 / 3),
                        as.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 3 ])
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(2 / 3),
                        as.Scalar(1),
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
                    .toBeHomogenous(as.Scalar(0))

                const firstLayerProgresses: Scalar[] = layersProgresses[ 1 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(firstLayerProgresses, INITIAL, indexOfFinalElement(firstLayerProgresses))
                expect(firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(1 / 3),
                        as.Scalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: Scalar[] = layersProgresses[ 2 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(secondLayerProgresses, INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(2 / 3),
                        as.Scalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: Scalar[] = layersProgresses[ 3 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: Scalar[] =
                    slice(thirdLayerProgresses, INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        as.Scalar(1),
                        as.Scalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
            })
        })

        describe('when layer count is one', () => {
            beforeEach(() => {
                layersProgresses = computeLayersProgresses({
                    layerCount: as.Cardinal<Layer[]>(1),
                    mode: HafuhafuMode.ZENO,
                    reverse: false,
                    sieve,
                    totalIndices,
                })
            })

            it('the progress goes from one to zero', () => {
                expect(length(layersProgresses))
                    .toBe(as.Cardinal<UnitScalar[][]>(1))
                expect(layersProgresses[ 0 ])
                    .toGoMonotonicallyFromValueToValue(
                        as.Scalar(0),
                        as.Scalar(1),
                        VERY_LOW_PRECISION,
                    )
            })
        })
    })
})
