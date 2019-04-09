import { apply, from, Integer, Scalar, to, ZERO_AND_POSITIVE_INTEGERS } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computeScalars: (specs: HafuhafuSpecs) => Scalar[] =
    ({ pitchStep }: HafuhafuSpecs): Scalar[] =>
        ZERO_AND_POSITIVE_INTEGERS.map((integer: Integer): Scalar =>
            to.Scalar(from.Base(apply.Power(pitchStep, to.Power(integer)))))

export {
    computeScalars,
}
