import {
    RangedInputType,
    SpecDataFor,
    SpecPropertyType,
    SpecValidationFunctionFor,
    SpecValidationResultsFor,
    standardInitialSpec,
    standardSpecAttributes,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { apply, isEven, Units } from '@musical-patterns/utilities'
import {
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { HafuhafuSpec, HafuhafuSpecAttributes } from './types'

const validationFunction: SpecValidationFunctionFor<HafuhafuSpec> =
    ({ block }: HafuhafuSpec): SpecValidationResultsFor<HafuhafuSpec> => {
        if (isEven(block.length)) {
            return {
                block: 'The block must have an odd length for this pattern to work.',
            }
        }

        return undefined
    }

const initial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_DURATION ]: HAFUHAFU_INITIAL_BASE_DURATION,
    [ StandardSpecProperties.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const hafuhafuWithPitchCircularityInitial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_DURATION ]:
        apply.Scalar(HAFUHAFU_INITIAL_BASE_DURATION, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    [ StandardSpecProperties.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const attributes: HafuhafuSpecAttributes = {
    ...standardSpecAttributes,
    block: {
        constraint: {
            min: 0,
        },
        hideInput: RangedInputType.RANGE,
        isArray: true,
        order: 1,
        specPropertyType: SpecPropertyType.RANGED,
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
}

const specData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial,
    validationFunction,
}

const hafuhafuWithPitchCircularitySpecData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial: hafuhafuWithPitchCircularityInitial,
}

export {
    specData,
    hafuhafuWithPitchCircularitySpecData,
}
