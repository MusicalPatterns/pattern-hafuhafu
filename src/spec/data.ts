import { SpecData } from '@musical-patterns/pattern'
import { attributes } from './attributes'
import { initial } from './initial'
import { HafuhafuSpec } from './types'
import { validationFunction } from './validation'

const specData: SpecData<HafuhafuSpec> = {
    attributes,
    initial,
    validationFunction,
}

export {
    specData,
}
