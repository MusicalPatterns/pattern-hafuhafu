// tslint:disable no-magic-numbers

import { Base, Block, Cardinal, Hz, Ms, Scalar, SEMITONE, to } from '@musical-patterns/utilities'
import { DeletionStyle } from './types'

const HAFUHAFU_INITIAL_BASE_FREQUENCY: Scalar<Hz> = to.Scalar(to.Hz(100))
const HAFUHAFU_INITIAL_BASE_DURATION: Scalar<Ms> = to.Scalar(to.Ms(175))
const HAFUHAFU_INITIAL_BLOCK: Block = to.Block([ 1, 13, 1, 1, 13 ])
const HAFUHAFU_INITIAL_DELETION_STYLE: DeletionStyle = DeletionStyle.FADE
const HAFUHAFU_INITIAL_ITERATION_LENGTH: Cardinal = to.Cardinal(16)
const HAFUHAFU_INITIAL_PITCH_STEP: Base = SEMITONE
const HAFUHAFU_INITIAL_REVERSED: boolean = false

export {
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_INITIAL_PITCH_STEP,
    HAFUHAFU_INITIAL_REVERSED,
}
