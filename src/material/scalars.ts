import {
    apply,
    Frequency,
    from,
    Hz,
    Integer,
    Logarithm,
    Scalar,
    to,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Hz>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Hz>> =>
        ZERO_AND_POSITIVE_INTEGERS.map((integer: Integer) =>
            to.Scalar<Hz>(from.Logarithm<Frequency>(apply.Power(
                pitchStep,
                to.Power<Logarithm<Frequency>>(integer),
            ))),
        )

export {
    computePitchScalars,
}
