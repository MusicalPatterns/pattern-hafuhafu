import { Validations } from '@musical-patterns/pattern'
import { computeValidations, HafuhafuSpecs, initialSpecs, to as hafuhafuTo } from '../../../src/indexForTest'

describe('validations', () => {
    it('ensures that the kernel has an odd length so that it is coprime with the deletion scheme', () => {
        const specs: HafuhafuSpecs = {
            ...initialSpecs,
            kernel: hafuhafuTo.Kernel([ 0, 1, 0, 1 ]),
        }

        const actualValidations: Validations<HafuhafuSpecs> = computeValidations(specs)

        expect(actualValidations)
            .toEqual({
                kernel: 'The kernel must have an odd length for this pattern to work.',
            })
    })
})
