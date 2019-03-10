import { PropertyType, RangedInputType, standardAttributes } from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { DeletionStyle, HafuhafuAttributes } from './types'

const attributes: HafuhafuAttributes = {
    ...standardAttributes,
    block: {
        constraint: {
            min: 0,
        },
        description: 'a pattern of pitches to cycle (use 0 for a rest)',
        hideInput: RangedInputType.RANGE,
        isArrayed: true,
        order: 1,
        propertyType: PropertyType.RANGED,
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
        order: 3,
        propertyType: PropertyType.OPTIONED,
    },
    iterationLength: {
        constraint: {
            integer: true,
            min: 2,
        },
        description: 'count of bars it takes for half the notes to have faded out and the tempo to have doubled',
        hideInput: RangedInputType.RANGE,
        order: 2,
        propertyType: PropertyType.RANGED,
        units: Units.BARS,
    },
    pitchStep: {
        description: 'the resolution you write your melody in',
        order: 4,
        propertyType: PropertyType.RANGED,
    },
    reversed: {
        description: 'instead fade in notes as they slow down to half the original speed',
        order: 5,
        propertyType: PropertyType.TOGGLED,
    },
}

export {
    attributes,
}
