import { InputType, RangedInputType, standardConfigurations } from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { specsOrder } from './orders'
import { DeletionStyle, HafuhafuConfigurations, HafuhafuSpec } from './types'

const configurations: HafuhafuConfigurations = {
    ...standardConfigurations,
    [ HafuhafuSpec.DELETION_STYLE ]: {
        constraint: [
            {
                formattedName: 'fade',
                order: 1,
                value: DeletionStyle.FADE,
            },
            {
                formattedName: 'random drop',
                order: 2,
                value: DeletionStyle.RANDOM_DROP,
            },
        ],
        inputType: InputType.OPTIONED,
        order: specsOrder.indexOf(HafuhafuSpec.DELETION_STYLE),
    },
    [ HafuhafuSpec.SIEVE_CYCLE_REPETITIONS ]: {
        constraint: {
            integer: true,
            min: 1,
        },
        description: `count of times it will repeat the sieve cycle over the kernel until \
it has completely sieved the notes its going to and the tempo has increased by the corresponding amount`,
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.SIEVE_CYCLE_REPETITIONS),
        units: Units.BARS,
    },
    [ HafuhafuSpec.KERNEL ]: {
        constraint: {
            integer: true,
            min: 0,
        },
        description: 'a pattern of pitches to cycle (use 0 for a rest)',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        isArrayed: true,
        order: specsOrder.indexOf(HafuhafuSpec.KERNEL),
    },
    [ HafuhafuSpec.PITCH_STEP ]: {
        description: 'the resolution you write your melody in',
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.PITCH_STEP),
    },
    [ HafuhafuSpec.REVERSED ]: {
        description: 'instead fade in notes as they slow down to half the original speed',
        inputType: InputType.TOGGLED,
        order: specsOrder.indexOf(HafuhafuSpec.REVERSED),
    },
    [ HafuhafuSpec.SIEVE ]: {
        constraint: {
            integer: true,
            min: 2,
        },
        description: 'how many notes to skip when you transform from one kernel into the next',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.SIEVE),
    },
}

export {
    configurations,
}
