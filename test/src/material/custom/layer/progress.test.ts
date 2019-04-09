import {
    Cardinal,
    indexOfFinalElement,
    INITIAL,
    NormalScalar,
    to,
    totalElements,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import { computeLayersProgresses, HafuhafuMode, Sieve, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('layers progresses', () => {
    describe('droste mode', () => {
        let layersProgresses: NormalScalar[][]
        const totalIndices: Cardinal = to.Cardinal(27)

        const layerCount: Cardinal = to.Cardinal(4)
        const sieve: Sieve = hafuhafuTo.Sieve(3)

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
            layersProgresses.forEach((layerProgress: NormalScalar[]) => {
                expect(totalElements(layerProgress))
                    .toBe(totalIndices)
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the last layer, the beyond layer, which just sticks at 1)`,
            () => {
                const firstLayerProgresses: NormalScalar[] = layersProgresses[ 0 ]
                expect(firstLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(0),
                        to.NormalScalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                expect(secondLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1 / 3),
                        to.NormalScalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                expect(thirdLayerProgresses)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(2 / 3),
                        to.NormalScalar(1),
                        VERY_LOW_PRECISION,
                    )

                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(to.NormalScalar(1))
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

                const firstLayerProgresses: NormalScalar[] = layersProgresses[ 0 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    firstLayerProgresses.slice(INITIAL, indexOfFinalElement(firstLayerProgresses))
                expect(firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1 / 3),
                        to.NormalScalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    secondLayerProgresses.slice(INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(2 / 3),
                        to.NormalScalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    thirdLayerProgresses.slice(INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1),
                        to.NormalScalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )

                expect(layersProgresses[ 3 ])
                    .toBeHomogenous(to.NormalScalar(1))
            })
        })
    })

    describe('zeno mode', () => {
        let layersProgresses: NormalScalar[][]
        const totalIndices: Cardinal = to.Cardinal(27)

        const layerCount: Cardinal = to.Cardinal(4)
        const sieve: Sieve = hafuhafuTo.Sieve(3)

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
            layersProgresses.forEach((layerProgress: NormalScalar[]) => {
                expect(totalElements(layerProgress))
                    .toBe(totalIndices)
            })
        })

        it(
            `each layer's progresses span the correct segment of the interval from 0 to 1, \
and span it quadratically (except the first layer, the home layer, which just sticks at 0)`,
            () => {
                expect(layersProgresses[ 0 ])
                    .toBeHomogenous(to.NormalScalar(0))
                expect(layersProgresses[ 1 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(0),
                        to.NormalScalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 2 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1 / 3),
                        to.NormalScalar(2 / 3),
                        VERY_LOW_PRECISION,
                    )
                expect(layersProgresses[ 3 ])
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(2 / 3),
                        to.NormalScalar(1),
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
                    .toBeHomogenous(to.NormalScalar(0))

                const firstLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    firstLayerProgresses.slice(INITIAL, indexOfFinalElement(firstLayerProgresses))
                expect(firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1 / 3),
                        to.NormalScalar(0),
                        VERY_LOW_PRECISION,
                    )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    secondLayerProgresses.slice(INITIAL, indexOfFinalElement(secondLayerProgresses))
                expect(secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(2 / 3),
                        to.NormalScalar(1 / 3),
                        VERY_LOW_PRECISION,
                    )

                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 3 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    thirdLayerProgresses.slice(INITIAL, indexOfFinalElement(thirdLayerProgresses))
                expect(thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                    .toGoQuadraticallyFromValueToValue(
                        to.NormalScalar(1),
                        to.NormalScalar(2 / 3),
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
                expect(totalElements(layersProgresses))
                    .toBe(to.Cardinal(1))
                expect(layersProgresses[ 0 ])
                    .toGoMonotonicallyFromValueToValue(
                        to.NormalScalar(0),
                        to.NormalScalar(1),
                        VERY_LOW_PRECISION,
                    )
            })
        })
    })
})
