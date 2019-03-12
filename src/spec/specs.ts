import { Spec } from '@musical-patterns/pattern'
import { configurations } from './configurations'
import { initial } from './initials'
import { HafuhafuSpecs } from './types'
import { computeValidations } from './validations'

const spec: Spec<HafuhafuSpecs> = {
    computeValidations,
    configurations,
    initial,
}

export {
    spec,
}
