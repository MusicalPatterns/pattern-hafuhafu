import { ComputeValidations, Validations } from '@musical-patterns/pattern'
import {
    areCoprime,
    Cardinal,
    computeCommonFactors,
    Integer,
    Ordinal,
    to,
    totalElements,
} from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../nominals'
import { HafuhafuSpec, HafuhafuSpecs } from './types'

const computeValidations: ComputeValidations<HafuhafuSpecs> =
    (hafuhafuSpecs: HafuhafuSpecs): Validations<HafuhafuSpecs> => {
        const kernel: Kernel = hafuhafuSpecs[ HafuhafuSpec.KERNEL ]
        const sieve: Sieve = hafuhafuSpecs[ HafuhafuSpec.SIEVE ]

        const kernelLength: Cardinal = totalElements(kernel)
        if (!areCoprime(kernelLength, to.Integer(sieve))) {
            const doNotIncludeTheFirstCommonFactorBecauseItIsJustOne: Ordinal = to.Ordinal(1)
            const commonFactors: Integer[] = computeCommonFactors(kernelLength, to.Integer(sieve))
                .slice(doNotIncludeTheFirstCommonFactorBecauseItIsJustOne)
            const validationMessage: string = `The sieve and kernel share at least one non-1 factor (${commonFactors}) \
and thus some kernel elements will not be preserved during cycling.`

            return {
                [ HafuhafuSpec.KERNEL ]: kernel.map(() => validationMessage),
                [ HafuhafuSpec.SIEVE ]: validationMessage,
            }
        }

        return undefined
    }

export {
    computeValidations,
}
