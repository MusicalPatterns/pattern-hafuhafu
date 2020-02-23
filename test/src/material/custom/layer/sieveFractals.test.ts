import { as, Cardinal, Ordinal } from '@musical-patterns/utilities'
import { computeSieveFractal, HafuhafuMode, Layer, LayerIndex, Sieve } from '../../../../../src/indexForTest'

describe('sieve fractals', (): void => {
    describe('droste mode', (): void => {
        it('grows like this, when sieve is 2', (): void => {
            const sieve: Sieve = as.Multiple<LayerIndex>(2)
            let layerCount: Cardinal<Layer[]>

            layerCount = as.Cardinal<Layer[]>(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0, 1,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    1, 0, 1, 2,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    2, 1, 2, 0,
                    2, 1, 2, 3,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    3, 2, 3, 1, 3, 2, 3, 0,
                    3, 2, 3, 1, 3, 2, 3, 4,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))
        })

        it('grows like this, when sieve is 3', (): void => {
            const sieve: Sieve = as.Multiple<LayerIndex>(3)
            let layerCount: Cardinal<Layer[]>

            layerCount = as.Cardinal<Layer[]>(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0, 1, 1,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    1, 0, 2, 1, 2, 2, 1, 2, 2,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    2, 1, 3, 2, 0, 3, 2, 3, 3,
                    2, 1, 3, 2, 3, 3, 2, 3, 3,
                    2, 1, 3, 2, 3, 3, 2, 3, 3,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    3, 2, 4, 3, 1, 4, 3, 4, 4,
                    3, 2, 4, 3, 0, 4, 3, 4, 4,
                    3, 2, 4, 3, 4, 4, 3, 4, 4,

                    3, 2, 4, 3, 1, 4, 3, 4, 4,
                    3, 2, 4, 3, 4, 4, 3, 4, 4,
                    3, 2, 4, 3, 4, 4, 3, 4, 4,

                    3, 2, 4, 3, 1, 4, 3, 4, 4,
                    3, 2, 4, 3, 4, 4, 3, 4, 4,
                    3, 2, 4, 3, 4, 4, 3, 4, 4,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))
        })
    })

    describe('zeno mode', (): void => {
        it('grows like this, when sieve is 2', (): void => {
            const sieve: Sieve = as.Multiple<LayerIndex>(2)
            let layerCount: Cardinal<Layer[]>

            layerCount = as.Cardinal<Layer[]>(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 1,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 2,
                    1, 2,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 3, 2, 3,
                    1, 3, 2, 3,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 4, 3, 4, 2, 4, 3, 4,
                    1, 4, 3, 4, 2, 4, 3, 4,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))
        })

        it('grows like this, when sieve is 3', (): void => {
            const sieve: Sieve = as.Multiple<LayerIndex>(3)
            let layerCount: Cardinal<Layer[]>

            layerCount = as.Cardinal<Layer[]>(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 1, 1,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 2, 2,
                    1, 2, 2,
                    1, 2, 2,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 3, 3, 2, 3, 3, 2, 3, 3,
                    1, 3, 3, 2, 3, 3, 2, 3, 3,
                    1, 3, 3, 2, 3, 3, 2, 3, 3,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))

            layerCount = as.Cardinal<Layer[]>(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,

                    1, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,

                    1, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,
                    2, 4, 4, 3, 4, 4, 3, 4, 4,
                ].map((expected: number): Ordinal<Layer[]> => as.Ordinal<Layer[]>(expected)))
        })
    })
})
