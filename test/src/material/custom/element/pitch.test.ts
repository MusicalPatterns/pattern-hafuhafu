import { as, Block, Pitch, Scalar } from '@musical-patterns/utilities'
import { computePitchIndex } from '../../../../../src/indexForTest'

describe('pitch', (): void => {
    describe('pitch index', (): void => {
        it('takes the pitch from the iteration kernel at the index, wrapping around if it exceeds the end', (): void => {
            const iterationKernel: Block = as.Block([ 1, 2, 3, 4, 5 ])

            expect(computePitchIndex({
                iterationIndex: as.Ordinal<Block>(2),
                iterationKernel,
            }))
                .toBe(as.Ordinal<Array<Scalar<Pitch>>>(3))

            expect(computePitchIndex({
                iterationIndex: as.Ordinal<Block>(3),
                iterationKernel,
            }))
                .toBe(as.Ordinal<Array<Scalar<Pitch>>>(4))

            expect(computePitchIndex({
                iterationIndex: as.Ordinal<Block>(99),
                iterationKernel,
            }))
                .toBe(as.Ordinal<Array<Scalar<Pitch>>>(5))
        })
    })
})
