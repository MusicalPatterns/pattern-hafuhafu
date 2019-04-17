// tslint:disable no-magic-numbers

import { Multiple, negative, NormalScalar, to, Translation } from '@musical-patterns/utilities'

const HALFWAY_THROUGH: NormalScalar = to.NormalScalar(0.5)

const DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION: Multiple<NormalScalar> =
    to.Multiple<NormalScalar>(2)
const CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS: Translation<NormalScalar> =
    to.Translation<NormalScalar>(negative(0.5))

export {
    HALFWAY_THROUGH,
    DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
    CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
}
