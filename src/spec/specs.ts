import { Spec } from '@musical-patterns/pattern'
import { configurations } from './configurations'
import { initialSpecs } from './initials'
import { presets } from './presets'
import { HafuhafuSpecs } from './types'
import { computeValidations } from './validations'

const spec: Spec<HafuhafuSpecs> = {
    computeValidations,
    configurations,
    initialSpecs,
    presets,
}

export {
    spec,
}
