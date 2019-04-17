import {
    apply,
    Base,
    Frequency,
    from,
    Hz,
    Integer,
    Scalar,
    to,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Hz>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Hz>> =>
        ZERO_AND_POSITIVE_INTEGERS.map((integer: Integer) =>
            to.Scalar<Hz>(from.Base<Frequency>(apply.Power(
                pitchStep,
                to.Power<Base<Frequency>>(integer),
            ))),
        )

export {
    computePitchScalars,
}
