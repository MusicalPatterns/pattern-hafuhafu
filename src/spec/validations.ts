import { ComputeValidations, Validations } from '@musical-patterns/pattern'
import { isEven } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from './types'

const computeValidations: ComputeValidations<HafuhafuSpecs> =
    ({ kernel }: HafuhafuSpecs): Validations<HafuhafuSpecs> => {
        if (isEven(kernel.length)) {
            return {
                kernel: 'The kernel must have an odd length for this pattern to work.',
            }
        }

        return undefined
    }

export {
    computeValidations,
}
