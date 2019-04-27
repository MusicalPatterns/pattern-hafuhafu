// tslint:disable no-magic-numbers

import { as, Multiple, negative, NormalScalar, Scalar, Translation } from '@musical-patterns/utilities'

const HALFWAY_THROUGH: NormalScalar = as.NormalScalar(0.5)

const DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION: Multiple<Scalar> =
    as.Multiple<Scalar>(2)
const CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS: Translation<Scalar> =
    as.Translation<Scalar>(negative(0.5))

export {
    HALFWAY_THROUGH,
    DOUBLE_THE_PROGRESS_AS_A_HACK_TO_MAKE_IT_WORK_FOR_HALF_AN_ITERATION,
    CONSIDER_ONLY_THE_SECOND_HALF_OF_THE_PROGRESS,
}
