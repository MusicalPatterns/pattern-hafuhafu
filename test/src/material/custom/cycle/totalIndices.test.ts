import { Cardinal, to } from '@musical-patterns/utilities'
import { computeTotalIndices, HafuhafuMode, to as hafuhafuTo } from '../../../../../src/indexForTest'

describe('total indices', () => {
    describe('droste mode', () => {
        it(
            `is the sieve to the power of the layer count minus 1 (how many times it layers on itself), \
times the sieve fractal repetitions, plus 1 extra for realignment`,
            () => {
                const totalIndices: Cardinal = computeTotalIndices({
                    layerCount: to.Cardinal(4),
                    mode: HafuhafuMode.DROSTE,
                    sieve: to.Multiple(2),
                    sieveFractalRepetitions: to.Cardinal(5),
                })

                expect(totalIndices)
                    .toBe(to.Cardinal(41))
            },
        )

        it('another example', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(3),
                mode: HafuhafuMode.DROSTE,
                sieve: to.Multiple(2),
                sieveFractalRepetitions: to.Cardinal(1),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(5))
        })

        it('an example with high sieve fractal repetitions', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(3),
                mode: HafuhafuMode.DROSTE,
                sieve: to.Multiple(2),
                sieveFractalRepetitions: to.Cardinal(31),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(125)) // 2^(3-1) * 31 + 1
        })

        it('an example with high layer count', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(11),
                mode: HafuhafuMode.DROSTE,
                sieve: to.Multiple(2),
                sieveFractalRepetitions: to.Cardinal(4),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(4097)) // 1024 * 4 + 1
        })

        it('an example with high sieve', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(3),
                mode: HafuhafuMode.DROSTE,
                sieve: to.Multiple(7),
                sieveFractalRepetitions: to.Cardinal(4),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(197)) // 49 * 4 + 1
        })
    })

    describe('zeno mode', () => {
        it('the length of the sieve fractal (sieve to the power one less than the layer count) times the sieve fractal repetitions,', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(2),
                mode: HafuhafuMode.ZENO,
                sieve: to.Multiple(7),
                sieveFractalRepetitions: to.Cardinal(4),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(28))
        })

        it('another example', () => {
            const totalIndices: Cardinal = computeTotalIndices({
                layerCount: to.Cardinal(3),
                mode: HafuhafuMode.ZENO,
                sieve: to.Multiple(3),
                sieveFractalRepetitions: to.Cardinal(1),
            })

            expect(totalIndices)
                .toBe(to.Cardinal(9))
        })
    })
})
