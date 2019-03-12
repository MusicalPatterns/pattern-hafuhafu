import { ComputeValidations, Validations } from '@musical-patterns/pattern'
import { isEven } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from './types'

const computeValidations: ComputeValidations<HafuhafuSpecs> =
    ({ block }: HafuhafuSpecs): Validations<HafuhafuSpecs> => {
        if (isEven(block.length)) {
            return {
                block: 'The block must have an odd length for this pattern to work.',
            }
        }

        return undefined
    }

export {
    computeValidations,
}
