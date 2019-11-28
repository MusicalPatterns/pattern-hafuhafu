import { ComputeValidations, Validations } from '@musical-patterns/spec'
import {
    areCoprime,
    as,
    Block,
    Cardinal,
    computeCommonFactors,
    computeLength,
    Integer,
    Ordinal,
    slice,
} from '@musical-patterns/utilities'
import { Sieve } from '../types'
import { HafuhafuSpec, HafuhafuSpecs } from './types'

const computeValidations: ComputeValidations<HafuhafuSpecs> =
    (hafuhafuSpecs: HafuhafuSpecs): Validations<HafuhafuSpecs> => {
        const sourceKernel: Block = hafuhafuSpecs[ HafuhafuSpec.SOURCE_KERNEL ]
        const sieve: Sieve = hafuhafuSpecs[ HafuhafuSpec.SIEVE ]

        const kernelLength: Cardinal<Block> = computeLength(sourceKernel)
        if (!areCoprime(kernelLength, sieve)) {
            const doNotIncludeTheFirstCommonFactorBecauseItIsJustOne: Ordinal<Integer[]> = as.Ordinal<Integer[]>(1)
            const commonFactors: Integer[] = slice(
                computeCommonFactors(kernelLength, sieve),
                doNotIncludeTheFirstCommonFactorBecauseItIsJustOne,
            )
            const validationMessage: string = `The sieve and kernel share at least one non-1 factor (${String(commonFactors)}) \
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
