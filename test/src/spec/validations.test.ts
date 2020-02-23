// tslint:disable no-duplicate-string

import { Validations } from '@musical-patterns/spec'
import { as } from '@musical-patterns/utilities'
import { computeValidations, HafuhafuSpec, HafuhafuSpecs, initialSpecs, LayerIndex } from '../../../src/indexForTest'

describe('validations', (): void => {
    describe('when the source kernel length and sieve are coprime', (): void => {
        it('when the source kernel length is a multiple of the sieve', (): void => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: as.Block([ 0, 1, 0, 1 ]),
                [ HafuhafuSpec.SIEVE ]: as.Multiple<LayerIndex>(2),
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

        it('when the sieve is a multiple of the source kernel length', (): void => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: as.Block([ 0, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: as.Multiple<LayerIndex>(6),
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

        it(`when the sieve and the source kernel's length share a factor`, (): void => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: as.Block([ 0, 1, 1, 0 ]),
                [ HafuhafuSpec.SIEVE ]: as.Multiple<LayerIndex>(6),
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

    describe('when the source kernel and sieve are not coprime', (): void => {
        it('all is well', (): void => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                [ HafuhafuSpec.SOURCE_KERNEL ]: as.Block([ 0, 1, 1, 1 ]),
                [ HafuhafuSpec.SIEVE ]: as.Multiple<LayerIndex>(3),
            }

            const validations: Validations<HafuhafuSpecs> = computeValidations(specs)

            expect(validations)
                .toEqual(undefined)
        })
    })
})
