import { Spec } from '@musical-patterns/pattern'
import { configurations } from './configurations'
import { initialSpecs } from './initials'
import { HafuhafuSpecs } from './types'
import { computeValidations } from './validations'

const spec: Spec<HafuhafuSpecs> = {
    computeValidations,
    configurations,
    initialSpecs,
}

export {
    spec,
}
