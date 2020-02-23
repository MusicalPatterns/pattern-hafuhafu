import { as, Frequency, Pitch, Scalar } from '@musical-patterns/utilities'
import { computePitchScalars, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('scalars', (): void => {
    it('creates a scale where each next scalar is the previous multiplied by whatever the pitch step is set to', (): void => {
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
