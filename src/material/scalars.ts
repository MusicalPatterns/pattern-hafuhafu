import {
    as,
    Frequency,
    Hz,
    Integer,
    Logarithm,
    notAs,
    Scalar,
    use,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Hz>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Hz>> =>
        ZERO_AND_POSITIVE_INTEGERS.map((integer: Integer) =>
            as.Scalar<Hz>(notAs.Logarithm<Frequency>(use.Power(
                pitchStep,
                as.Power<Logarithm<Frequency>>(integer),
            ))),
        )

export {
    computePitchScalars,
}
