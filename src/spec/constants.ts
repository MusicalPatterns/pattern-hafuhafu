// tslint:disable no-magic-numbers

import { Base, Block, Count, Frequency, Milliseconds, SEMITONE, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'

const HAFUHAFU_INITIAL_BASE_FREQUENCY: Frequency = to.Frequency(100)
const HAFUHAFU_INITIAL_BASE_DURATION: Milliseconds = to.Milliseconds(175)
const HAFUHAFU_INITIAL_BLOCK: Block = to.Block([ 1, 13, 1, 1, 13 ])
const HAFUHAFU_INITIAL_DELETION_STYLE: DeletionStyle = DeletionStyle.FADE
const HAFUHAFU_INITIAL_ITERATION_LENGTH: Count = to.Count(16)
const HAFUHAFU_INITIAL_PITCH_STEP: Base = SEMITONE

export {
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_INITIAL_PITCH_STEP,
}
