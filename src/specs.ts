import {
    PatternSpecDataFor,
    PatternSpecPropertyType,
    standardInitialPatternSpec,
    standardPatternSpecAttributes,
    StandardPatternSpecProperties,
} from '@musical-patterns/pattern'
import { apply } from '@musical-patterns/utilities'
import {
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { HafuhafuPatternSpec, HafuhafuPatternSpecAttributes } from './types'

const initial: HafuhafuPatternSpec = {
    ...standardInitialPatternSpec,
    [ StandardPatternSpecProperties.PATTERN_DURATION_SCALAR ]: HAFUHAFU_DURATION_SCALAR,
    [ StandardPatternSpecProperties.PATTERN_PITCH_SCALAR ]: HAFUHAFU_PITCH_SCALAR,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const hafuhafuWithPitchCircularityInitial: HafuhafuPatternSpec = {
    ...standardInitialPatternSpec,
    [ StandardPatternSpecProperties.PATTERN_DURATION_SCALAR ]:
        apply.Scalar(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    [ StandardPatternSpecProperties.PATTERN_PITCH_SCALAR ]: HAFUHAFU_PITCH_SCALAR,
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const attributes: HafuhafuPatternSpecAttributes = {
    ...standardPatternSpecAttributes,
    block: {
        patternSpecPropertyType: PatternSpecPropertyType.RANGED,
    },
    iterationLength: {
        constraint: {
            integer: true,
            min: 2,
        },
        patternSpecPropertyType: PatternSpecPropertyType.RANGED,
    },
}

const specData: PatternSpecDataFor<HafuhafuPatternSpec> = {
    attributes,
    initial,
}

const hafuhafuWithPitchCircularitySpecData: PatternSpecDataFor<HafuhafuPatternSpec> = {
    attributes,
    initial: hafuhafuWithPitchCircularityInitial,
}

export {
    specData,
    hafuhafuWithPitchCircularitySpecData,
}
