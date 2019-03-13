import { Scalar, testArraysAreCloseSoFar, to } from '@musical-patterns/utilities'
import { computeScalars, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('scalars', () => {
    it('creates a scale where each next scalar is x the previous by whatever the pitch step is set to', () => {
        const specs: HafuhafuSpecs = {
            ...initialSpecs,
            pitchStep: to.Base(3),
        }

        const actualScalars: Scalar[] = computeScalars(specs)

        testArraysAreCloseSoFar(actualScalars, [
            1,
            3,
            9,
            27,
            81,
            243,
        ].map(to.Scalar))
    })
})
