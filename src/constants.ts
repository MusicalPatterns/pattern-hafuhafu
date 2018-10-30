// tslint:disable:no-magic-numbers

import { Base, Block, Count, Offset, Scalar, to } from '../../../src'

const BAR_COUNT: Count = to.Count(16)
const HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR: Scalar = to.Scalar(2)
const BASE_FOR_GAIN_FADE: Base = to.Base(2)
const PITCH_INDEX_BASE_OFFSET: Offset = to.Offset(1)
const HAFUHAFU_PITCH_SCALAR: Scalar = to.Scalar(50)
const HAFUHAFU_DURATION_SCALAR: Scalar = to.Scalar(25)
const HAFUHAFU_INITIAL_BLOCK: Block = to.Block([ 0, 1, 0, 0, 1 ])

export {
    BAR_COUNT,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
    BASE_FOR_GAIN_FADE,
    PITCH_INDEX_BASE_OFFSET,
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
}
