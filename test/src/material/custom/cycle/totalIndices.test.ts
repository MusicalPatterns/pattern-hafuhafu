import { as, Cardinal } from '@musical-patterns/utilities'
import { computeTotalIndices, HafuhafuMode, Layer, LayerIndex } from '../../../../../src/indexForTest'

describe('total indices', (): void => {
    describe('droste mode', (): void => {
        it(
            `is the sieve to the power of the layer count minus 1 (how many times it layers on itself), \
times the sieve fractal repetitions, plus 1 extra for realignment`,
            (): void => {
                const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                    layerCount: as.Cardinal<Layer[]>(4),
                    mode: HafuhafuMode.DROSTE,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(5),
                })

                expect(totalIndices)
                    .toBe(as.Cardinal<LayerIndex[]>(41))
            },
        )

        it('another example', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(3),
                mode: HafuhafuMode.DROSTE,
                sieve: as.Multiple<LayerIndex>(2),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(1),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(5))
        })

        it('an example with high sieve fractal repetitions', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(3),
                mode: HafuhafuMode.DROSTE,
                sieve: as.Multiple<LayerIndex>(2),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(31),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(125)) // 2^(3-1) * 31 + 1
        })

        it('an example with high layer count', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(11),
                mode: HafuhafuMode.DROSTE,
                sieve: as.Multiple<LayerIndex>(2),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(4097)) // 1024 * 4 + 1
        })

        it('an example with high sieve', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(3),
                mode: HafuhafuMode.DROSTE,
                sieve: as.Multiple<LayerIndex>(7),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(197)) // 49 * 4 + 1
        })
    })

    describe('zeno mode', (): void => {
        it('the length of the sieve fractal (sieve to the power one less than the layer count) times the sieve fractal repetitions,', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(2),
                mode: HafuhafuMode.ZENO,
                sieve: as.Multiple<LayerIndex>(7),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(28))
        })

        it('another example', (): void => {
            const totalIndices: Cardinal<LayerIndex[]> = computeTotalIndices({
                layerCount: as.Cardinal<Layer[]>(3),
                mode: HafuhafuMode.ZENO,
                sieve: as.Multiple<LayerIndex>(3),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(1),
            })

            expect(totalIndices)
                .toBe(as.Cardinal<LayerIndex[]>(9))
        })
    })
})
