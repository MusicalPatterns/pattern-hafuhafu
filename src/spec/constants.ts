// tslint:disable no-magic-numbers

import {
    Base,
    Cardinal,
    Hz,
    Ms,
    Scalar,
    SCIENTIFIC_PITCHES,
    ScientificPitchNoteName,
    ScientificPitchOctaveNumber,
    SEMITONE,
    to,
} from '@musical-patterns/utilities'
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

const POPCORN_PRESET_BASE_FREQUENCY: Scalar<Hz> =
    to.Scalar(SCIENTIFIC_PITCHES[ ScientificPitchNoteName.B ][ ScientificPitchOctaveNumber._3 ])
const POPCORN_PRESET_KERNEL: Kernel = hafuhafuTo.Kernel([ 13, 11, 13, 8, 4, 8, 1, 0 ])
const POPCORN_PRESET_SIEVE: Sieve = hafuhafuTo.Sieve(3)

const AASB_SIEVEWISE_PRESET_SIEVE: Sieve = hafuhafuTo.Sieve(6)

const MONOCOT_PRESET_KERNEL: Kernel = hafuhafuTo.Kernel([ 1 ])
const MONOCOT_PRESET_SIEVE: Sieve = hafuhafuTo.Sieve(5)

const SCALE_SCRAMBLE_PRESET_BASE_DURATION: Scalar<Ms> = to.Scalar(to.Ms(343))
const SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY: Scalar<Hz> = to.Scalar(to.Hz(77))
const SCALE_SCRAMBLE_PRESET_KERNEL: Kernel = hafuhafuTo.Kernel([ 1, 2, 3, 4, 5, 6, 7 ])
const SCALE_SCRAMBLE_PRESET_PITCH_STEP: Base = to.Base(1.25992104989)
const SCALE_SCRAMBLE_PRESET_SIEVE_CYCLE_REPETITIONS: Cardinal = to.Cardinal(7)
const SCALE_SCRAMBLE_PRESET_SIEVE: Sieve = hafuhafuTo.Sieve(3)

const AASB_KERNELWISE_PRESET_KERNEL: Kernel = hafuhafuTo.Kernel([ 1, 1, 1, 13, 1, 13, 13 ])

const THREE_PHASER_PRESET_KERNEL: Kernel = hafuhafuTo.Kernel([ 1, 1, 13, 1, 1, 13, 13 ])

export {
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_KERNEL,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_SIEVE_CYCLE_REPETITIONS,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
    HAFUHAFU_INITIAL_SIEVE,
    POPCORN_PRESET_BASE_FREQUENCY,
    POPCORN_PRESET_KERNEL,
    POPCORN_PRESET_SIEVE,
    AASB_SIEVEWISE_PRESET_SIEVE,
    MONOCOT_PRESET_KERNEL,
    MONOCOT_PRESET_SIEVE,
    SCALE_SCRAMBLE_PRESET_BASE_DURATION,
    SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY,
    SCALE_SCRAMBLE_PRESET_KERNEL,
    SCALE_SCRAMBLE_PRESET_PITCH_STEP,
    SCALE_SCRAMBLE_PRESET_SIEVE,
    SCALE_SCRAMBLE_PRESET_SIEVE_CYCLE_REPETITIONS,
    AASB_KERNELWISE_PRESET_KERNEL,
    THREE_PHASER_PRESET_KERNEL,
}
