import { Data } from '@musical-patterns/pattern'
import { attributes } from './attributes'
import { initial } from './initial'
import { HafuhafuSpec } from './types'
import { validationFunction } from './validation'

const data: Data<HafuhafuSpec> = {
    attributes,
    initial,
    validationFunction,
}

export {
    data,
}
