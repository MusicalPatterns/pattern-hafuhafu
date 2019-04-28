import { as, Frequency, Integer, Logarithm, Pitch, range, Scalar, use } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { ENOUGH_PITCH_SCALARS_THAT_NO_ONE_WILL_PROBABLY_EVER_NOTICE } from './constants'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Pitch>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Pitch>> =>
        range(ENOUGH_PITCH_SCALARS_THAT_NO_ONE_WILL_PROBABLY_EVER_NOTICE)
            .map((integer: Integer) =>
                as.Scalar<Pitch>(as.number(use.Power(
                    pitchStep,
                    as.Power<Logarithm<Frequency>>(integer),
                ))),
            )

export {
    computePitchScalars,
}
