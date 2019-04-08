import { computeBasicOptionedConstraintFromEnum, OptionedConstraint, RangedConstraint } from '@musical-patterns/spec'
import { ObjectOf } from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode, HafuhafuSpec } from './types'

const optionedConstraints: ObjectOf<OptionedConstraint> = {
    [ HafuhafuSpec.EXISTENCE_STYLE ]: computeBasicOptionedConstraintFromEnum(ExistenceStyle),
    [ HafuhafuSpec.MODE ]: computeBasicOptionedConstraintFromEnum(HafuhafuMode),
}

const rangedConstraints: ObjectOf<RangedConstraint> = {
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: {
        integer: true,
        min: 1,
    },
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: {
        integer: true,
        min: 1,
    },
    [ HafuhafuSpec.SOURCE_KERNEL ]: {
        integer: true,
        min: -1,
    },
    [ HafuhafuSpec.SIEVE ]: {
        integer: true,
        min: 2,
    },
    [ HafuhafuSpec.LAYER_COUNT ]: {
        integer: true,
        min: 1,
    },
}

export {
    optionedConstraints,
    rangedConstraints,
}
