import { standardInitialSpec, StandardSpecProperties } from '@musical-patterns/pattern'
import { apply } from '@musical-patterns/utilities'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from '../constants'
import { HafuhafuSpec } from '../types'
import {
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
} from './constants'

const initial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_DURATION ]: HAFUHAFU_INITIAL_BASE_DURATION,
    [ StandardSpecProperties.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    deletionStyle: HAFUHAFU_INITIAL_DELETION_STYLE,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

const hafuhafuWithPitchCircularityInitial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardSpecProperties.BASE_DURATION ]:
        apply.Scalar(HAFUHAFU_INITIAL_BASE_DURATION, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    [ StandardSpecProperties.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    deletionStyle: HAFUHAFU_INITIAL_DELETION_STYLE,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
}

export {
    initial,
    hafuhafuWithPitchCircularityInitial,
}
