import { standardInitialSpecs, StandardSpec } from '@musical-patterns/pattern'
import {
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
} from './constants'
import { HafuhafuSpecs } from './types'

const initialSpecs: HafuhafuSpecs = {
    ...standardInitialSpecs,
    [ StandardSpec.BASE_DURATION ]: HAFUHAFU_INITIAL_BASE_DURATION,
    [ StandardSpec.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    block: HAFUHAFU_INITIAL_BLOCK,
    deletionStyle: HAFUHAFU_INITIAL_DELETION_STYLE,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
    pitchStep: HAFUHAFU_INITIAL_PITCH_STEP,
    reversed: HAFUHAFU_INITIAL_REVERSED,
}

export {
    initialSpecs,
}
