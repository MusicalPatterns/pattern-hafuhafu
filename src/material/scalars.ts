import { apply, from, Integer, Scalar, to, zeroAndPositiveIntegers } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'

const computeScalars: (spec: HafuhafuSpec) => Scalar[] =
    ({ pitchStep }: HafuhafuSpec): Scalar[] =>
        zeroAndPositiveIntegers.map((integer: Integer): Scalar =>
            to.Scalar(from.Base(apply.Power(pitchStep, to.Power(integer)))))

export {
    computeScalars,
}
