import { standardInitialSpecs, StandardSpec } from '@musical-patterns/pattern'
import {
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_KERNEL,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
    HAFUHAFU_INITIAL_SIEVE,
    HAFUHAFU_INITIAL_SIEVE_CYCLE_REPETITIONS,
} from './constants'
import { HafuhafuSpec, HafuhafuSpecs } from './types'

const initialSpecs: HafuhafuSpecs = {
    ...standardInitialSpecs,
    [ StandardSpec.BASE_DURATION ]: HAFUHAFU_INITIAL_BASE_DURATION,
    [ StandardSpec.BASE_FREQUENCY ]: HAFUHAFU_INITIAL_BASE_FREQUENCY,
    [ HafuhafuSpec.DELETION_STYLE ]: HAFUHAFU_INITIAL_DELETION_STYLE,
    [ HafuhafuSpec.SIEVE_CYCLE_REPETITIONS ]: HAFUHAFU_INITIAL_SIEVE_CYCLE_REPETITIONS,
    [ HafuhafuSpec.KERNEL ]: HAFUHAFU_INITIAL_KERNEL,
    [ HafuhafuSpec.PITCH_STEP ]: HAFUHAFU_INITIAL_PITCH_STEP,
    [ HafuhafuSpec.REVERSED ]: HAFUHAFU_INITIAL_REVERSED,
    [ HafuhafuSpec.SIEVE ]: HAFUHAFU_INITIAL_SIEVE,
}

export {
    initialSpecs,
}
