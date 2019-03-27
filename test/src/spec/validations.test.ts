// tslint:disable no-duplicate-string

import { Validations } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import {
    computeValidations,
    HafuhafuSpec,
    HafuhafuSpecs,
    initialSpecs,
    to as hafuhafuTo,
} from '../../../src/indexForTest'

describe('validations', () => {
    describe('when the source kernel length and sieve are coprime', () => {
        it('when the source kernel length is a multiple of the sieve', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: to.Block([ 0, 1, 0, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(2),
            }

            const validations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(validations)
                .toEqual({
                    [ HafuhafuSpec.SOURCE_KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                })
        })

        it('when the sieve is a multiple of the source kernel length', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: to.Block([ 0, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(6),
            }

            const validations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(validations)
                .toEqual({
                    [ HafuhafuSpec.SOURCE_KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (3) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                })
        })

        it(`when the sieve and the source kernel's length share a factor`, () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: to.Block([ 0, 1, 1, 0 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(6),
            }

            const validations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(validations)
                .toEqual({
                    [ HafuhafuSpec.SOURCE_KERNEL ]: [
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                        'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                    ],
                    [ HafuhafuSpec.SIEVE ]: 'The sieve and kernel share at least one non-1 factor (2) and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.',
                })
        })
    })

    describe('when the source kernel and sieve are not coprime', () => {
        it('all is well', () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: to.Block([ 0, 1, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: hafuhafuTo.Sieve(3),
            }

            const validations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(validations)
                .toEqual(undefined)
        })
    })
})
