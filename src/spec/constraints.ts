import { OptionedConstraint, RangedConstraint } from '@musical-patterns/pattern'
import { ObjectOf } from '@musical-patterns/utilities'
import { ExistenceStyle, HafuhafuMode, HafuhafuSpec } from './types'

const optionedConstraints: ObjectOf<OptionedConstraint> = {
    [ HafuhafuSpec.EXISTENCE_STYLE ]: [
        {
            formattedName: 'Fade',
            order: 1,
            value: ExistenceStyle.FADE,
        },
        {
            formattedName: 'Random Drop',
            order: 2,
            value: ExistenceStyle.RANDOM_DROP,
        },
    ],
    [ HafuhafuSpec.MODE ]: [
        {
            order: 1,
            value: HafuhafuMode.ZENO,
        },
        {
            order: 2,
            value: HafuhafuMode.DROSTE,
        },
    ],
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
