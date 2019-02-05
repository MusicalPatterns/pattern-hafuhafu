import { Scalar, testArraysAreClose, to } from '@musical-patterns/utilities'
import { buildScalars, HafuhafuSpec, initial } from '../../../src/indexForTest'

describe('scalars', () => {
    it('creates a scale where each next scalar is x the previous by whatever the pitch step is set to', () => {
        const spec: HafuhafuSpec = {
            ...initial,
            pitchStep: to.Base(3),
        }

        const actualScalars: Scalar[] = buildScalars(spec)

        testArraysAreClose(actualScalars, [
            1,
            3,
            9,
            27,
            81,
            243,
        ].map(to.Scalar))
    })
})
