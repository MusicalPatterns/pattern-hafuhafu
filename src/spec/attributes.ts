import { RangedInputType, SpecPropertyType, standardSpecAttributes } from '@musical-patterns/pattern'
import { Units } from '@musical-patterns/utilities'
import { DeletionStyle, HafuhafuSpecAttributes } from '../types'

const attributes: HafuhafuSpecAttributes = {
    ...standardSpecAttributes,
    block: {
        constraint: {
            min: 0,
        },
        hideInput: RangedInputType.RANGE,
        isArrayed: true,
        order: 1,
        specPropertyType: SpecPropertyType.RANGED,
    },
    deletionStyle: {
        constraint: [
            {
                formattedName: 'fade',
                key: DeletionStyle.FADE,
                order: 1,
            },
            {
                formattedName: 'random drop',
                key: DeletionStyle.RANDOM_DROP,
                order: 2,
            },
        ],
        order: 3,
        specPropertyType: SpecPropertyType.OPTIONED,
    },
    iterationLength: {
        constraint: {
            integer: true,
            min: 2,
        },
        description: 'count of bars it takes for half the notes to have faded out and the tempo to have doubled',
        hideInput: RangedInputType.RANGE,
        order: 2,
        specPropertyType: SpecPropertyType.RANGED,
        units: Units.BARS,
    },
    pitchStep: {
        description: 'the resolution you write your melody in',
        order: 4,
        specPropertyType: SpecPropertyType.RANGED,
    },
}

export {
    attributes,
}
