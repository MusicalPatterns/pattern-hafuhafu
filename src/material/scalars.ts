import { apply, from, Integer, Scalar, to, zeroAndPositiveIntegers } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computeScalars: (specs: HafuhafuSpecs) => Scalar[] =
    ({ pitchStep }: HafuhafuSpecs): Scalar[] =>
        zeroAndPositiveIntegers.map((integer: Integer): Scalar =>
            to.Scalar(from.Base(apply.Power(pitchStep, to.Power(integer)))))

export {
    computeScalars,
}
