import { SpecDataFor } from '@musical-patterns/pattern'
import { HafuhafuSpec } from '../types'
import { attributes } from './attributes'
import { initial } from './initial'
import { validationFunction } from './validation'

const specData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial,
    validationFunction,
}

export {
    specData,
}
