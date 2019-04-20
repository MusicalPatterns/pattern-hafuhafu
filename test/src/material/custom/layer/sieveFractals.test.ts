import { as, Cardinal, Multiple, Ordinal } from '@musical-patterns/utilities'
import { computeSieveFractal, HafuhafuMode } from '../../../../../src/indexForTest'

describe('sieve fractals', () => {
    describe('droste mode', () => {
        it('grows like this, when sieve is 2', () => {
            const sieve: Multiple<Ordinal> = as.Multiple<Ordinal>(2)
            let layerCount: Cardinal

            layerCount = as.Cardinal(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0, 1,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    1, 0, 1, 2,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    2, 1, 2, 0,
                    2, 1, 2, 3,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    3, 2, 3, 1, 3, 2, 3, 0,
                    3, 2, 3, 1, 3, 2, 3, 4,
                ].map(as.Ordinal))
        })

        it('grows like this, when sieve is 3', () => {
            const sieve: Multiple<Ordinal> = as.Multiple<Ordinal>(3)
            let layerCount: Cardinal

            layerCount = as.Cardinal(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    0, 1, 1,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    1, 0, 2, 1, 2, 2, 1, 2, 2,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.DROSTE))
                .toEqual([
                    2, 1, 3, 2, 0, 3, 2, 3, 3,
                    2, 1, 3, 2, 3, 3, 2, 3, 3,
                    2, 1, 3, 2, 3, 3, 2, 3, 3,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(5)
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
                ].map(as.Ordinal))
        })
    })

    describe('zeno mode', () => {
        it('grows like this, when sieve is 2', () => {
            const sieve: Multiple<Ordinal> = as.Multiple<Ordinal>(2)
            let layerCount: Cardinal

            layerCount = as.Cardinal(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 1,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 2,
                    1, 2,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 3, 2, 3,
                    1, 3, 2, 3,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(5)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 4, 3, 4, 2, 4, 3, 4,
                    1, 4, 3, 4, 2, 4, 3, 4,
                ].map(as.Ordinal))
        })

        it('grows like this, when sieve is 3', () => {
            const sieve: Multiple<Ordinal> = as.Multiple<Ordinal>(3)
            let layerCount: Cardinal

            layerCount = as.Cardinal(1)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(2)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 1, 1,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(3)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 2, 2,
                    1, 2, 2,
                    1, 2, 2,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(4)
            expect(computeSieveFractal(sieve, layerCount, HafuhafuMode.ZENO))
                .toEqual([
                    0, 3, 3, 2, 3, 3, 2, 3, 3,
                    1, 3, 3, 2, 3, 3, 2, 3, 3,
                    1, 3, 3, 2, 3, 3, 2, 3, 3,
                ].map(as.Ordinal))

            layerCount = as.Cardinal(5)
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
                ].map(as.Ordinal))
        })
    })
})
