import { Spec } from '@musical-patterns/pattern'
import { configurations } from './configurations'
import { initial } from './initial'
import { HafuhafuSpecs } from './types'
import { computeValidations } from './validation'

const spec: Spec<HafuhafuSpecs> = {
    computeValidations,
    configurations,
    initial,
}

export {
    spec,
}
