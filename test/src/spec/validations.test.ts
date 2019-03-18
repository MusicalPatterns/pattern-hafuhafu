// tslint:disable no-duplicate-string

import { Validations } from '@musical-patterns/pattern'
import {
    computeValidations,
    HafuhafuSpec,
    HafuhafuSpecs,
    initialSpecs,
    to as hafuhafuTo,
} from '../../../src/indexForTest'

describe('validations', () => {
    describe('when the kernel and sieve are coprime', () => {
        it('when the kernel length is a multiple of the sieve', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.KERNEL ]: hafuhafuTo.Kernel([ 0, 1, 0, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(2),
            }

            const actualValidations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(actualValidations)
                .toEqual({
                    [ HafuhafuSpec.KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                })
        })

        it('when the sieve is a multiple of the kernel length', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.KERNEL ]: hafuhafuTo.Kernel([ 0, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(6),
            }

            const actualValidations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(actualValidations)
                .toEqual({
                    [ HafuhafuSpec.KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved during cycling.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved during cycling.',
                })
        })

        it('when the sieve and the kernel length share a factor', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.KERNEL ]: hafuhafuTo.Kernel([ 0, 1, 1, 0 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(6),
            }

            const actualValidations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(actualValidations)
                .toEqual({
                    [ HafuhafuSpec.KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved during cycling.',
                })
        })
    })

    describe('when the kernel and sieve are not coprime', () => {
        it('all is well', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.KERNEL ]: hafuhafuTo.Kernel([ 0, 1, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(3),
            }

            const actualValidations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(actualValidations)
                .toEqual(undefined)
        })
    })
})
