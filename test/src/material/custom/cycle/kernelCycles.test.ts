import { as, Block, Cardinal } from '@musical-patterns/utilities'
import {
    computeKernelCycle,
    HafuhafuMode,
    Layer,
    LayerIndex,
    Sieve,
    SieveFractalRepetitions,
} from '../../../../../src/indexForTest'

describe('kernel cycle', () => {
    let mode: HafuhafuMode
    describe('when mode is droste', () => {
        beforeEach(() => {
            mode = HafuhafuMode.DROSTE
        })

        it(
            `computes a series of kernels taking into account how many times the sieve fractal is repeated - \
each next kernel has every sieve'th element chosen until all have been chosen, but starting from a point translated \
based on where the previous iteration left off`,
            () => {
                const sourceKernel: Block = as.Block([ 1, 2, 3, 4, 5 ])
                const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(3)

                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(1), // Iteration lasts 2^2 * 1 + 1, so start on index 5 then take every other
                    sourceKernel,
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ],
                        [ 1, 3, 5, 2, 4 ],
                        [ 1, 5, 4, 3, 2 ],
                        [ 1, 4, 2, 5, 3 ],
                    ].map(as.Block)))

                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(2), // Iteration lasts 2^2 * 2 + 1, so start on index 9 then take every other
                    sourceKernel,
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ],
                        [ 5, 2, 4, 1, 3 ],
                        [ 3, 2, 1, 5, 4 ],
                        [ 4, 2, 5, 3, 1 ],
                    ].map(as.Block)))
            },
        )

        it('works for other layer counts greater than 3', () => {
            const sourceKernel: Block = as.Block([ 1, 2, 3, 4, 5 ])
            const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(4)

            expect(computeKernelCycle({
                layerCount,
                mode,
                reverse: false,
                sieve: as.Multiple<LayerIndex>(2),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(1), // Iteration lasts 2^3 * 1 + 1, so start on index 9 then take every other
                sourceKernel,
            }))
                .toEqual(as.Cycle([
                    [ 1, 2, 3, 4, 5 ],
                    [ 5, 2, 4, 1, 3 ],
                    [ 3, 2, 1, 5, 4 ],
                    [ 4, 2, 5, 3, 1 ],
                ].map(as.Block)))

            expect(computeKernelCycle({
                layerCount,
                mode,
                reverse: false,
                sieve: as.Multiple<LayerIndex>(2),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(2), // Iteration lasts 2^3 * 2 + 1, so start on index 17 then take every other
                sourceKernel,
            }))
                .toEqual(as.Cycle([
                    [ 1, 2, 3, 4, 5 ],
                    [ 3, 5, 2, 4, 1 ],
                    [ 2, 1, 5, 4, 3 ],
                    [ 5, 3, 1, 4, 2 ],
                ].map(as.Block)))
        })

        it('when sieve is greater than 2', () => {
            const sourceKernel: Block = as.Block([ 1, 2, 3, 4, 5 ])
            const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(3)

            expect(computeKernelCycle({
                layerCount,
                mode,
                reverse: false,
                sieve: as.Multiple<LayerIndex>(3),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(1), // Iteration lasts 3^2 * 1 + 1, so start on index 10 then take every third
                sourceKernel,
            }))
                .toEqual(as.Cycle([
                    [ 1, 2, 3, 4, 5 ],
                    [ 1, 4, 2, 5, 3 ],
                    [ 1, 5, 4, 3, 2 ],
                    [ 1, 3, 5, 2, 4 ],
                ].map(as.Block)))
        })

        describe('reverse', () => {
            it('example one, easy - the last kernel length of elements at the end is the same as those at the beginning, because the kernel divides evenly into the iteration', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(6), // 6 * 2^(3-1) + (1 for realign) = 25 iteration length, which is a multiple of kernel length 5
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 1,2,3,4,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,1,_,_,_; _,1,_,2,_; 3,1,_,2,_; 3,1,4,2,_; 3,1,4,2,5.
                        [ 3, 1, 4, 2, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 3,1,4,2,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,3,_,_,_; _,3,_,1,_; 4,3,_,1,_; 4,3,2,1,_; 4,3,2,1,5.
                        [ 4, 3, 2, 1, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 4,3,2,1,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,4,_,_,_; _,4,_,3,_; 2,4,_,3,_; 2,4,1,3,_; 2,4,1,3,5.
                        [ 2, 4, 1, 3, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 2,4,1,3,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,2,_,_,_; _,2,_,4,_; 1,2,_,4,_; 1,2,3,4,_; 1,2,3,4,5.
                    ].map(as.Block)))
            })

            it('example two, where kernel length does not divide evenly into iteration length', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4), // 4 * 2^(3-1) + (1 for realign) = 17 iteration length, which is *not* a multiple of kernel length 5
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 3,4,5,1,2 => _,3,_,_,_; _,3,_,4,_; 5,3,_,4,_; 5,3,1,4,_; 5,3,1,4,2.
                        [ 5, 3, 1, 4, 2 ], // Ends as 1,4,2,5,3 => _,1,_,_,_; _,1,_,4,_; 2,1,_,4,_; 2,1,5,4,_; 2,1,5,4,3.
                        [ 2, 1, 5, 4, 3 ], // Etc.
                        [ 3, 5, 2, 4, 1 ],
                    ].map(as.Block)))
            })

            it('example three, with higher sieve', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(3),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(2), // 2 * 3^(3-1) + (1 for realign) = 19 iteration length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 5,1,2,3,4 => _,_,5,_,_; 1,_,5,_,_; 1,_,5,2,_; 1,3,5,2,_; 1,3,5,2,4.
                        [ 1, 3, 5, 2, 4 ], // Ends as 4,1,3,5,2 => _,_,4,_,_; ... 1,5,4,3,2.
                        [ 1, 5, 4, 3, 2 ], // Ends as 2,1,5,4,3 => ... 1,4,2,5,3.
                        [ 1, 4, 2, 5, 3 ], // Ends as 3,1,4,2,5 => ... 1,2,3,4,5.
                    ].map(as.Block)))
            })

            it('example four, with higher layer count', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(4),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(2), // 2 * 2^(4-1) + (1 for realign) = 17 iteration length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 3,4,5,1,2 => _,3,_,_,_; _,3,_,4,_; 5,3,_,4,_; 5,3,1,4,_; 5,3,1,4,2;
                        [ 5, 3, 1, 4, 2 ], // Ends as 1,4,2,5,3 ... 2,1,5,4,3.
                        [ 2, 1, 5, 4, 3 ], // Etc.
                        [ 3, 5, 2, 4, 1 ],
                    ].map(as.Block)))
            })

            it('example five, with a different kernel length', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4), // 4 * 2^(3-1) + (1 for realign) = 17 iteration length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5, 6, 7 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5, 6, 7 ], // Ends as 4,5,6,7,1,2,3 => _,4,_,_,_,_,_; _,4,_,5,_,_,_; _,4,_,5,_,6,_; 7,4,_,5,_,6,_; 7,4,1,5,_,6,_; 7,4,1,5,2,6,_; 7,4,1,5,2,6,3.
                        [ 7, 4, 1, 5, 2, 6, 3 ], // Ends as 5,2,6,3,7,4,1 => _,5,_,_,_,_,_; ...
                        [ 3, 5, 7, 2, 4, 6, 1 ],
                    ].map(as.Block)))
            })
        })
    })

    describe('when mode is zeno', () => {
        let sieve: Sieve
        const REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_THREE_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION: SieveFractalRepetitions = as.Multiple<Cardinal<LayerIndex[]>>(3)
        const REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_FIVE_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION: SieveFractalRepetitions = as.Multiple<Cardinal<LayerIndex[]>>(5)
        const REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_SEVEN_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION: SieveFractalRepetitions = as.Multiple<Cardinal<LayerIndex[]>>(7)
        const sieveFractalRepetitions: SieveFractalRepetitions = REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_FIVE_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION
        const layerCount: Cardinal<Layer[]> = as.Cardinal<Layer[]>(3)

        beforeEach(() => {
            mode = HafuhafuMode.ZENO
        })

        describe('when sieve is 2', () => {
            beforeEach(() => {
                sieve = as.Multiple<LayerIndex>(2)
            })

            it('returns the cycle of kernels required to get from the original kernel back to itself by repeatedly applying the sieve, for a four-phase cycle', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve,
                    sieveFractalRepetitions,
                    sourceKernel: as.Block([ 0, 0, 1, 0, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 0, 1, 0, 1 ],
                        [ 0, 1, 1, 0, 0 ],
                        [ 0, 1, 0, 1, 0 ],
                        [ 0, 0, 0, 1, 1 ],
                    ].map(as.Block)))
            })

            it('works for a two-phase cycle', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve,
                    sieveFractalRepetitions,
                    sourceKernel: as.Block([ 0, 1, 0, 0, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 1, 0, 0, 1 ],
                        [ 0, 0, 1, 1, 0 ],
                    ].map(as.Block)))
            })

            it('works for a one-phase cycle (a kernel which goes into itself)', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve,
                    sieveFractalRepetitions: REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_SEVEN_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION,
                    sourceKernel: as.Block([ 0, 0, 0, 1, 0, 1, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 0, 0, 1, 0, 1, 1 ],
                    ].map(as.Block)))
            })

            it('works for a three-phase cycle', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve,
                    sieveFractalRepetitions: REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_SEVEN_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION,
                    sourceKernel: as.Block([ 0, 0, 1, 1, 0, 0, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 0, 1, 1, 0, 0, 1 ],
                        [ 0, 1, 0, 1, 0, 1, 0 ],
                        [ 0, 0, 0, 0, 1, 1, 1 ],
                    ].map(as.Block)))
            })
        })

        describe('when sieve is 3', () => {
            it('works', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(3),
                    sieveFractalRepetitions,
                    sourceKernel: as.Block([ 0, 0, 1, 0, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 0, 1, 0, 1 ],
                        [ 0, 0, 0, 1, 1 ],
                        [ 0, 1, 0, 1, 0 ],
                        [ 0, 1, 1, 0, 0 ],
                    ].map(as.Block)))
            })

            it('when sieve is greater than the kernel length, it still works', () => {
                expect(computeKernelCycle({
                    layerCount,
                    mode,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(5),
                    sieveFractalRepetitions: REPETITIONS_COUNT_MATCHING_KERNEL_LENGTH_THREE_SO_THAT_KERNEL_DIVIDES_EVENLY_INTO_ITERATION,
                    sourceKernel: as.Block([ 0, 0, 1 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 0, 0, 1 ],
                        [ 0, 1, 0 ],
                    ].map(as.Block)))
            })
        })

        describe('when the kernel length does not divide evenly into the iteration length', () => {
            it('offsets where in the next iteration kernel the sieving begins', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(4),
                    mode,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4), // Total 32 indices in iteration because 2^(4-1) * 4, so it should start on index 32 and take every 2nd from there
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ],
                        [ 3, 5, 2, 4, 1 ],
                        [ 2, 1, 5, 4, 3 ],
                        [ 5, 3, 1, 4, 2 ],
                    ].map(as.Block)))
            })
        })

        describe('reverse', () => {
            it('example one, easy - the last kernel length of elements at the end is the same as those at the beginning, because the kernel divides evenly into the iteration', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(2),
                    mode,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(5), // 5 * 2^(2-1) = 10 iteration length, which is a multiple of 5 kernel length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 1,2,3,4,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,1,_,_,_; _,1,_,2,_; 3,1,_,2,_; 3,1,4,2,_; 3,1,4,2,5.
                        [ 3, 1, 4, 2, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 3,1,4,2,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,3,_,_,_; _,3,_,1,_; 4,3,_,1,_; 4,3,2,1,_; 4,3,2,1,5.
                        [ 4, 3, 2, 1, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 4,3,2,1,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,4,_,_,_; _,4,_,3,_; 2,4,_,3,_; 2,4,1,3,_; 2,4,1,3,5.
                        [ 2, 4, 1, 3, 5 ], // Because kernel length divides evenly into iteration length, terminal kernel is the same: 2,4,1,3,5, so take that and starting on sieve minus 1 index drop them every sieve positions: _,2,_,_,_; _,2,_,4,_; 1,2,_,4,_; 1,2,3,4,_; 1,2,3,4,5.
                    ].map(as.Block)))
            })

            it('example two, where kernel length does not divide evenly into iteration length', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(2),
                    mode,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(7), // 7 * 2^(2-1) = 14 iteration length, which is *not* a multiple of 5 kernel length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 5,1,2,3,4 => _,5,_,_,_; _,5,_,1,_; 2,5,_,1,_; 2,5,3,1,_; 2,5,3,1,4.
                        [ 2, 5, 3, 1, 4 ], // Ends as 4,2,5,3,1
                        [ 5, 4, 3, 2, 1 ], // Ends as 1,5,4,3,2
                        [ 4, 1, 3, 5, 2 ],
                    ].map(as.Block)))
            })

            it('example three, with higher sieve', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(2),
                    mode,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(3),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(6), // 6 * 3^(2-1) = 18 iteration length, which is *not* a multiple of 5 kernel length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 4,5,1,2,3 => _,_,4,_,_; 5,_,4,_,_; 5,_,4,1,_; 5,2,4,1,_; 5,2,4,1,3.
                        [ 5, 2, 4, 1, 3 ], // Ends as 1,3,5,2,4
                        [ 3, 2, 1, 5, 4 ], // Ends as 5,4,3,2,1
                        [ 4, 2, 5, 3, 1 ],
                    ].map(as.Block)))
            })

            it('example four, with higher layer count', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(3), // 3 * 2^(3-1) = 12 iteration length, which is *not* a multiple of 5 kernel length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5 ], // Ends as 3,4,5,1,2 => _,3,_,_,_; _,3,_,4,_; 5,3,_,4,_; 5,3,1,4,_; 5,3,1,4,2.
                        [ 5, 3, 1, 4, 2 ], // Ends as 1,4,2,5,3
                        [ 2, 1, 5, 4, 3 ], // Ends as 5,4,3,2,1
                        [ 3, 5, 2, 4, 1 ],
                    ].map(as.Block)))
            })

            it('example five, with a different kernel length', () => {
                expect(computeKernelCycle({
                    layerCount: as.Cardinal<Layer[]>(2),
                    mode,
                    reverse: true,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(11), // 11 * 2^(2-1) = 22 iteration length, which is *not* a multiple of 7 kernel length
                    sourceKernel: as.Block([ 1, 2, 3, 4, 5, 6, 7 ]),
                }))
                    .toEqual(as.Cycle([
                        [ 1, 2, 3, 4, 5, 6, 7 ], // Ends as 2,3,4,5,6,7,1 => _,2,_,_,_,_,_; _,2,_,3,_,_,_; _,2,_,3,_,4,_; 5,2,_,3,_,4,_; 5,2,6,3,_,4,_; 5,2,6,3,7,4,_; 5,2,6,3,7,4,1.
                        [ 5, 2, 6, 3, 7, 4, 1 ], // Ends as 2,6,3,7,4,1,5
                        [ 7, 2, 4, 6, 1, 3, 5 ],
                    ].map(as.Block)))
            })
        })
    })
})
