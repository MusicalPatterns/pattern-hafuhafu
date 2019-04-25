import { as, Frequency, Pitch, Scalar } from '@musical-patterns/utilities'
import { computePitchScalars, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('scalars', () => {
    it('creates a scale where each next scalar is the previous multiplied by whatever the pitch step is set to', () => {
        const specs: HafuhafuSpecs = {
            ...initialSpecs,
            pitchStep: as.Logarithm<Frequency>(3),
        }

        const pitchScalars: Array<Scalar<Pitch>> = computePitchScalars(specs)

        expect(pitchScalars)
            .toBeCloseSoFar([
                1,
                3,
                9,
                27,
                81,
                243,
            ].map(as.Scalar))
    })
})
