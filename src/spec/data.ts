import { SpecDataFor } from '@musical-patterns/pattern'
import { attributes } from './attributes'
import { initial } from './initial'
import { HafuhafuSpec } from './types'
import { validationFunction } from './validation'

const specData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial,
    validationFunction,
}

export {
    specData,
}
