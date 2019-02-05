import { apply, from, Scalar, to, zeroAndPositiveIntegers } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'

const buildScalars: (spec: HafuhafuSpec) => Scalar[] =
    ({ pitchStep }: HafuhafuSpec): Scalar[] =>
        zeroAndPositiveIntegers.map((integer: number): Scalar =>
            to.Scalar(from.Base(apply.Power(pitchStep, to.Power(integer)))))

export {
    buildScalars,
}
