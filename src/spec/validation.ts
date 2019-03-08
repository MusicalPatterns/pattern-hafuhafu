import { ValidationFunction, ValidationResults } from '@musical-patterns/pattern'
import { isEven } from '@musical-patterns/utilities'
import { HafuhafuSpec } from './types'

const validationFunction: ValidationFunction<HafuhafuSpec> =
    ({ block }: HafuhafuSpec): ValidationResults<HafuhafuSpec> => {
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
