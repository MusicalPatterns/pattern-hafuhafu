// tslint:disable no-magic-numbers

import { Base, Cardinal, Hz, Ms, Scalar, SEMITONE, to } from '@musical-patterns/utilities'
import { Kernel, Sieve, to as hafuhafuTo } from '../nominals'
import { DeletionStyle } from './types'

const HAFUHAFU_INITIAL_BASE_FREQUENCY: Scalar<Hz> = to.Scalar(to.Hz(100))
const HAFUHAFU_INITIAL_BASE_DURATION: Scalar<Ms> = to.Scalar(to.Ms(350))
const HAFUHAFU_INITIAL_KERNEL: Kernel = hafuhafuTo.Kernel([ 1, 13, 1, 1, 13 ])
const HAFUHAFU_INITIAL_DELETION_STYLE: DeletionStyle = DeletionStyle.FADE
const HAFUHAFU_INITIAL_SIEVE_CYCLE_REPETITIONS: Cardinal = to.Cardinal(8)
const HAFUHAFU_INITIAL_PITCH_STEP: Base = SEMITONE
const HAFUHAFU_INITIAL_REVERSED: boolean = false
const HAFUHAFU_INITIAL_SIEVE: Sieve = hafuhafuTo.Sieve(2)

export {
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_KERNEL,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_SIEVE_CYCLE_REPETITIONS,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
    HAFUHAFU_INITIAL_SIEVE,
}
