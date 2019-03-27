import { Block, to } from '@musical-patterns/utilities'
import { computePitchIndex } from '../../../../../src/indexForTest'

describe('pitch', () => {
    describe('pitch index', () => {
        it('takes the pitch from the iteration kernel at the index, wrapping around if it exceeds the end', () => {
            const iterationKernel: Block = to.Block([ 1, 2, 3, 4, 5 ])

            expect(computePitchIndex({
                iterationIndex: to.Ordinal(2),
                iterationKernel,
            }))
                .toBe(to.Ordinal(3))

            expect(computePitchIndex({
                iterationIndex: to.Ordinal(3),
                iterationKernel,
            }))
                .toBe(to.Ordinal(4))

            expect(computePitchIndex({
                iterationIndex: to.Ordinal(99),
                iterationKernel,
            }))
                .toBe(to.Ordinal(5))
        })
    })
})
