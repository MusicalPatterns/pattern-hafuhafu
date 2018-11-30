// tslint:disable:no-magic-numbers

import { Block, to as patternTo } from '@musical-patterns/pattern'
import { Base, Count, Offset, Scalar, to } from '@musical-patterns/utilities'

const HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR: Scalar = to.Scalar(2)
const BASE_FOR_GAIN_FADE: Base = to.Base(2)
const PITCH_INDEX_BASE_OFFSET: Offset = to.Offset(1)
const HAFUHAFU_PITCH_SCALAR: Scalar = to.Scalar(50)
const HAFUHAFU_DURATION_SCALAR: Scalar = to.Scalar(175)
const HAFUHAFU_INITIAL_BLOCK: Block = patternTo.Block([ 0, 1, 0, 0, 1 ])
const HAFUHAFU_INITIAL_ITERATION_LENGTH: Count = to.Count(16)

export {
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
    BASE_FOR_GAIN_FADE,
    PITCH_INDEX_BASE_OFFSET,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
}
