import {
    SpecDataFor,
    SpecPropertyType,
    standardInitialSpec,
    standardSpecAttributes,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { apply } from '@musical-patterns/utilities'
import {
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { HafuhafuSpec, HafuhafuSpecAttributes } from './types'

const initial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.PATTERN_DURATION_SCALAR ]: HAFUHAFU_DURATION_SCALAR,
    [ StandardSpecProperties.PATTERN_PITCH_SCALAR ]: HAFUHAFU_PITCH_SCALAR,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const hafuhafuWithPitchCircularityInitial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.PATTERN_DURATION_SCALAR ]:
        apply.Scalar(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    [ StandardSpecProperties.PATTERN_PITCH_SCALAR ]: HAFUHAFU_PITCH_SCALAR,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const attributes: HafuhafuSpecAttributes = {
    ...standardSpecAttributes,
    block: {
        specPropertyType: SpecPropertyType.RANGED,
    },
    iterationLength: {
        constraint: {
            integer: true,
            min: 2,
        },
        specPropertyType: SpecPropertyType.RANGED,
    },
}

const specData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial,
}

const hafuhafuWithPitchCircularitySpecData: SpecDataFor<HafuhafuSpec> = {
    attributes,
    initial: hafuhafuWithPitchCircularityInitial,
}

export {
    specData,
    hafuhafuWithPitchCircularitySpecData,
}
