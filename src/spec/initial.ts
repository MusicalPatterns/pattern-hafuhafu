import { standardInitialSpec, StandardProperty } from '@musical-patterns/pattern'
import {
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
} from './constants'
import { HafuhafuSpec } from './types'

const initial: HafuhafuSpec = {
    ...standardInitialSpec,
    [ StandardProperty.BASE_DURATION ]: HAFUHAFU_INITIAL_BASE_DURATION,
    [ StandardProperty.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    deletionStyle: HAFUHAFU_INITIAL_DELETION_STYLE,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
    pitchStep: HAFUHAFU_INITIAL_PITCH_STEP,
    reversed: HAFUHAFU_INITIAL_REVERSED,
}

export {
    initial,
}
