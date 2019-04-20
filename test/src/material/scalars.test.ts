import { Frequency, Hz, Scalar, to } from '@musical-patterns/utilities'
import { computePitchScalars, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('scalars', () => {
    it('creates a scale where each next scalar is the previous multiplied by whatever the pitch step is set to', () => {
        const specs: HafuhafuSpecs = {
            ...initialSpecs,
            pitchStep: to.Logarithm<Frequency>(3),
        }

        const scalars: Array<Scalar<Hz>> = computePitchScalars(specs)

        expect(scalars)
            .toBeCloseSoFar([
                1,
                3,
                9,
                27,
                81,
                243,
            ].map(to.Scalar))
    })
})
