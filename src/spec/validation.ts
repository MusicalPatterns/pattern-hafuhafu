import { SpecValidationFunction, SpecValidationResults } from '@musical-patterns/pattern'
import { isEven } from '@musical-patterns/utilities'
import { HafuhafuSpec } from './types'

const validationFunction: SpecValidationFunction<HafuhafuSpec> =
    ({ block }: HafuhafuSpec): SpecValidationResults<HafuhafuSpec> => {
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
