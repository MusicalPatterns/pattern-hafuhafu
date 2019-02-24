import { SpecValidationFunctionFor, SpecValidationResultsFor } from '@musical-patterns/pattern'
import { isEven } from '@musical-patterns/utilities'
import { HafuhafuSpec } from './types'

const validationFunction: SpecValidationFunctionFor<HafuhafuSpec> =
    ({ block }: HafuhafuSpec): SpecValidationResultsFor<HafuhafuSpec> => {
        if (isEven(block.length)) {
            return {
                block: 'The block must have an odd length for this pattern to work.',
            }
        }

        return undefined
    }

export {
    validationFunction,
}
