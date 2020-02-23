import { computeBasicOptionedConstraintFromEnum, OptionedConstraint, RangedConstraint } from '@musical-patterns/spec'
import { ObjectOf } from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode, HafuhafuSpec } from './types'

const optionedConstraints: ObjectOf<OptionedConstraint> = {
    [ HafuhafuSpec.EXISTENCE_STYLE ]: computeBasicOptionedConstraintFromEnum(ExistenceStyle, { required: true }),
    [ HafuhafuSpec.MODE ]: computeBasicOptionedConstraintFromEnum(HafuhafuMode, { required: true }),
}

const rangedConstraints: ObjectOf<RangedConstraint> = {
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: {
        integer: true,
        min: 1,
        required: true,
    },
    [ HafuhafuSpec.SOURCE_KERNEL ]: {
        integer: true,
        min: -1,
        required: true,
    },
    [ HafuhafuSpec.SIEVE ]: {
        integer: true,
        min: 2,
        required: true,
    },
    [ HafuhafuSpec.LAYER_COUNT ]: {
        integer: true,
        min: 1,
        required: true,
    },
}

export {
    optionedConstraints,
    rangedConstraints,
}
