import {
    as,
    Frequency,
    Hz,
    Integer,
    Logarithm,
    notAs, Pitch,
    Scalar,
    use,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Pitch>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Pitch>> =>
        ZERO_AND_POSITIVE_INTEGERS.map((integer: Integer) =>
            as.Scalar<Pitch>(notAs.Logarithm<Frequency>(use.Power(
                pitchStep,
                as.Power<Logarithm<Frequency>>(integer),
            ))),
        )

export {
    computePitchScalars,
}
