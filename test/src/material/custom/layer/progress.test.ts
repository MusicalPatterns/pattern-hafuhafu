import {
    Cardinal,
    indexOfFinalElement,
    INITIAL,
    NormalScalar,
    testAllValuesAreTheSame,
    testGoesMonotonicallyFromValueToValue,
    testGoesQuadraticallyFromValueToValue,
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
                testGoesQuadraticallyFromValueToValue(
                    firstLayerProgresses,
                    to.NormalScalar(0),
                    to.NormalScalar(1 / 3),
                    VERY_LOW_PRECISION,
                )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                testGoesQuadraticallyFromValueToValue(
                    secondLayerProgresses,
                    to.NormalScalar(1 / 3),
                    to.NormalScalar(2 / 3),
                    VERY_LOW_PRECISION,
                )
                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                testGoesQuadraticallyFromValueToValue(
                    thirdLayerProgresses,
                    to.NormalScalar(2 / 3),
                    to.NormalScalar(1),
                    VERY_LOW_PRECISION,
                )

                testAllValuesAreTheSame(layersProgresses[ 3 ], to.NormalScalar(1))
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
                testGoesQuadraticallyFromValueToValue(
                    firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
                    to.NormalScalar(1 / 3),
                    to.NormalScalar(0),
                    VERY_LOW_PRECISION,
                )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    secondLayerProgresses.slice(INITIAL, indexOfFinalElement(secondLayerProgresses))
                testGoesQuadraticallyFromValueToValue(
                    secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
                    to.NormalScalar(2 / 3),
                    to.NormalScalar(1 / 3),
                    VERY_LOW_PRECISION,
                )

                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    thirdLayerProgresses.slice(INITIAL, indexOfFinalElement(thirdLayerProgresses))
                testGoesQuadraticallyFromValueToValue(
                    thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
                    to.NormalScalar(1),
                    to.NormalScalar(2 / 3),
                    VERY_LOW_PRECISION,
                )

                testAllValuesAreTheSame(layersProgresses[ 3 ], to.NormalScalar(1))
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
                testAllValuesAreTheSame(layersProgresses[ 0 ], to.NormalScalar(0))
                testGoesQuadraticallyFromValueToValue(
                    layersProgresses[ 1 ],
                    to.NormalScalar(0),
                    to.NormalScalar(1 / 3),
                    VERY_LOW_PRECISION,
                )
                testGoesQuadraticallyFromValueToValue(
                    layersProgresses[ 2 ],
                    to.NormalScalar(1 / 3),
                    to.NormalScalar(2 / 3),
                    VERY_LOW_PRECISION,
                )
                testGoesQuadraticallyFromValueToValue(
                    layersProgresses[ 3 ],
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

                testAllValuesAreTheSame(layersProgresses[ 0 ], to.NormalScalar(0))

                const firstLayerProgresses: NormalScalar[] = layersProgresses[ 1 ]
                const firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    firstLayerProgresses.slice(INITIAL, indexOfFinalElement(firstLayerProgresses))
                testGoesQuadraticallyFromValueToValue(
                    firstLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
                    to.NormalScalar(1 / 3),
                    to.NormalScalar(0),
                    VERY_LOW_PRECISION,
                )

                const secondLayerProgresses: NormalScalar[] = layersProgresses[ 2 ]
                const secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    secondLayerProgresses.slice(INITIAL, indexOfFinalElement(secondLayerProgresses))
                testGoesQuadraticallyFromValueToValue(
                    secondLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
                    to.NormalScalar(2 / 3),
                    to.NormalScalar(1 / 3),
                    VERY_LOW_PRECISION,
                )

                const thirdLayerProgresses: NormalScalar[] = layersProgresses[ 3 ]
                const thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: NormalScalar[] =
                    thirdLayerProgresses.slice(INITIAL, indexOfFinalElement(thirdLayerProgresses))
                testGoesQuadraticallyFromValueToValue(
                    thirdLayerProgressDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne,
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
                testGoesMonotonicallyFromValueToValue(
                    layersProgresses[ 0 ],
                    to.NormalScalar(0),
                    to.NormalScalar(1),
                    VERY_LOW_PRECISION,
                )
            })
        })
    })
})
