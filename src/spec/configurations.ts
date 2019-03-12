import { InputType, RangedInputType, standardConfigurations } from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { DeletionStyle, HafuhafuConfigurations } from './types'

const configurations: HafuhafuConfigurations = {
    ...standardConfigurations,
    block: {
        constraint: {
            min: 0,
        },
        description: 'a pattern of pitches to cycle (use 0 for a rest)',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        isArrayed: true,
        order: 1,
    },
    deletionStyle: {
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
        order: 3,
    },
    iterationLength: {
        constraint: {
            integer: true,
            min: 2,
        },
        description: 'count of bars it takes for half the notes to have faded out and the tempo to have doubled',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: 2,
        units: Units.BARS,
    },
    pitchStep: {
        description: 'the resolution you write your melody in',
        inputType: InputType.RANGED,
        order: 4,
    },
    reversed: {
        description: 'instead fade in notes as they slow down to half the original speed',
        inputType: InputType.TOGGLED,
        order: 5,
    },
}

export {
    configurations,
}
