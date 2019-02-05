// tslint:disable:no-magic-numbers

import { Block, Count, Frequency, Milliseconds, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'

const HAFUHAFU_INITIAL_BASE_FREQUENCY: Frequency = to.Frequency(50)
const HAFUHAFU_INITIAL_BASE_DURATION: Milliseconds = to.Milliseconds(175)
const HAFUHAFU_INITIAL_BLOCK: Block = to.Block([ 0, 1, 0, 0, 1 ])
const HAFUHAFU_INITIAL_DELETION_STYLE: DeletionStyle = DeletionStyle.FADE
const HAFUHAFU_INITIAL_ITERATION_LENGTH: Count = to.Count(16)

export {
    HAFUHAFU_INITIAL_BASE_FREQUENCY,
    HAFUHAFU_INITIAL_BASE_DURATION,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_DELETION_STYLE,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
}
