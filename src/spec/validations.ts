import { ComputeValidations, Validations } from '@musical-patterns/spec'
import {
    areCoprime,
    Block,
    Cardinal,
    computeCommonFactors,
    Integer,
    Multiple,
    Ordinal,
    slice,
    to,
    totalElements,
} from '@musical-patterns/utilities'
import { HafuhafuSpec, HafuhafuSpecs } from './types'

const computeValidations: ComputeValidations<HafuhafuSpecs> =
    (hafuhafuSpecs: HafuhafuSpecs): Validations<HafuhafuSpecs> => {
        const sourceKernel: Block = hafuhafuSpecs[ HafuhafuSpec.SOURCE_KERNEL ]
        const sieve: Multiple<Ordinal> = hafuhafuSpecs[ HafuhafuSpec.SIEVE ]

        const kernelLength: Cardinal = totalElements(sourceKernel)
        if (!areCoprime(kernelLength, to.Integer(sieve))) {
            const doNotIncludeTheFirstCommonFactorBecauseItIsJustOne: Ordinal<Integer> = to.Ordinal<Integer>(1)
            const commonFactors: Integer[] = slice(
                computeCommonFactors(kernelLength, to.Integer(sieve)),
                doNotIncludeTheFirstCommonFactorBecauseItIsJustOne,
            )
            const validationMessage: string = `The sieve and kernel share at least one non-1 factor (${commonFactors}) \
and thus some kernel elements will not be preserved across iterations, preventing the formation of a kernel cycle.`

            return {
                [ HafuhafuSpec.SOURCE_KERNEL ]: sourceKernel.map(() => validationMessage),
                [ HafuhafuSpec.SIEVE ]: validationMessage,
            }
        }

        return undefined
    }

export {
    computeValidations,
}
