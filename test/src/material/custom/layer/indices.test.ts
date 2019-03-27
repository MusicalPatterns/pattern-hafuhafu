import { Cardinal, Ordinal, to } from '@musical-patterns/utilities'
import {
    computeLayerIndices,
    computeTotalIndices,
    HafuhafuMode,
    Sieve,
    to as hafuhafuTo,
} from '../../../../../src/indexForTest'

describe('layer indices', () => {
    describe('droste mode', () => {
        const REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES: Cardinal = to.Cardinal(2)
        const sieve: Sieve = hafuhafuTo.Sieve(2)

        it('tells you which layer a droste element is in, for layer count 2', () => {
            const layerCount: Cardinal = to.Cardinal(2)
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                sieve,
                sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
            })
            const layerIndices: Ordinal[] = computeLayerIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                reverse: false,
                sieve,
                totalIndices,
            })

            expect(layerIndices)
                .toEqual([
                    0, 1,
                    0, 1,
                    0,
                ].map(to.Ordinal))
        })

        it('tells you which layer a droste element is in, for layer count 3', () => {
            const layerCount: Cardinal = to.Cardinal(3)
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                sieve,
                sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
            })
            const layerIndices: Ordinal[] = computeLayerIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                reverse: false,
                sieve,
                totalIndices,
            })

            expect(layerIndices)
                .toEqual([
                    1, 0, 1, 2,
                    1, 0, 1, 2,
                    1,
                ].map(to.Ordinal))
        })

        it('tells you which layer a droste element is in, for layer count 4', () => {
            const layerCount: Cardinal = to.Cardinal(4)
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                sieve,
                sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
            })
            const layerIndices: Ordinal[] = computeLayerIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                reverse: false,
                sieve,
                totalIndices,
            })

            expect(layerIndices)
                .toEqual([
                    2, 1, 2, 0, 2, 1, 2, 3,
                    2, 1, 2, 0, 2, 1, 2, 3,
                    2,
                ].map(to.Ordinal))
        })

        it('tells you which layer a droste element is in, for layer count 5', () => {
            const layerCount: Cardinal = to.Cardinal(5)
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                sieve,
                sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
            })
            const layerIndices: Ordinal[] = computeLayerIndices({
                layerCount,
                mode: HafuhafuMode.DROSTE,
                reverse: false,
                sieve,
                totalIndices,
            })

            expect(layerIndices)
                .toEqual([
                    3, 2, 3, 1, 3, 2, 3, 0, 3, 2, 3, 1, 3, 2, 3, 4,
                    3, 2, 3, 1, 3, 2, 3, 0, 3, 2, 3, 1, 3, 2, 3, 4,
                    3,
                ].map(to.Ordinal))
        })

        describe('when reverse is true', () => {
            it('tells you which layer a droste element is in, for layer count 2', () => {
                const layerCount: Cardinal = to.Cardinal(2)
                const totalIndices: Cardinal = computeTotalIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    sieve,
                    sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
                })
                const layerIndices: Ordinal[] = computeLayerIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                expect(layerIndices)
                    .toEqual([
                        0,
                        1, 0,
                        1, 0,
                    ].map(to.Ordinal))
            })

            it('tells you which layer a droste element is in, for layer count 3', () => {
                const layerCount: Cardinal = to.Cardinal(3)
                const totalIndices: Cardinal = computeTotalIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    sieve,
                    sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
                })
                const layerIndices: Ordinal[] = computeLayerIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                expect(layerIndices)
                    .toEqual([
                        1,
                        2, 1, 0, 1,
                        2, 1, 0, 1,
                    ].map(to.Ordinal))
            })

            it('tells you which layer a droste element is in, for layer count 4', () => {
                const layerCount: Cardinal = to.Cardinal(4)
                const totalIndices: Cardinal = computeTotalIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    sieve,
                    sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
                })
                const layerIndices: Ordinal[] = computeLayerIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                expect(layerIndices)
                    .toEqual([
                        2,
                        3, 2, 1, 2, 0, 2, 1, 2,
                        3, 2, 1, 2, 0, 2, 1, 2,
                    ].map(to.Ordinal))
            })

            it('tells you which layer a droste element is in, for layer count 5', () => {
                const layerCount: Cardinal = to.Cardinal(5)
                const totalIndices: Cardinal = computeTotalIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    sieve,
                    sieveFractalRepetitions: REPEAT_THE_SIEVE_FRACTAL_AT_LEAST_ONCE_TO_DEMONSTRATE_THE_CONSEQUENT_REPTITION_IN_THE_LAYER_INDICES,
                })
                const layerIndices: Ordinal[] = computeLayerIndices({
                    layerCount,
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve,
                    totalIndices,
                })

                expect(layerIndices)
                    .toEqual([
                        3,
                        4, 3, 2, 3, 1, 3, 2, 3, 0, 3, 2, 3, 1, 3, 2, 3,
                        4, 3, 2, 3, 1, 3, 2, 3, 0, 3, 2, 3, 1, 3, 2, 3,
                    ].map(to.Ordinal))
            })
        })
    })

    describe('zeno mode', () => {
        it(
            `repeats the shape of the sieve fractal for as many indices as are asked for \
(calculating that count, which involves the sieve fractal repetitions and cycling against the kernel, \
is a separate problem solved by the method for calculating that total # of indices)`,
            () => {
                const layerIndices: Ordinal[] = computeLayerIndices({
                    layerCount: to.Cardinal(4),
                    mode: HafuhafuMode.ZENO,
                    reverse: false,
                    sieve: hafuhafuTo.Sieve(3),
                    totalIndices: to.Cardinal(135),
                })

                expect(layerIndices)
                    .toEqual([
                        0, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,

                        0, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,

                        0, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,

                        0, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,

                        0, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                        1, 3, 3, 2, 3, 3, 2, 3, 3,
                    ].map(to.Ordinal))
            },
        )

        it('when reversed, flips it backward', () => {
            const layerIndices: Ordinal[] = computeLayerIndices({
                layerCount: to.Cardinal(4),
                mode: HafuhafuMode.ZENO,
                reverse: true,
                sieve: hafuhafuTo.Sieve(3),
                totalIndices: to.Cardinal(135),
            })

            expect(layerIndices)
                .toEqual([
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 0,

                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 0,

                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 0,

                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 0,

                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 1,
                    3, 3, 2, 3, 3, 2, 3, 3, 0,
                ].map(to.Ordinal))
        })
    })
})
