import { as, Frequency, Integer, Pitch, pow, range, Scalar } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { ENOUGH_PITCH_SCALARS_THAT_NO_ONE_WILL_PROBABLY_EVER_NOTICE } from './constants'

const computePitchScalars: (specs: HafuhafuSpecs) => Array<Scalar<Pitch>> =
    ({ pitchStep }: HafuhafuSpecs): Array<Scalar<Pitch>> =>
        range(ENOUGH_PITCH_SCALARS_THAT_NO_ONE_WILL_PROBABLY_EVER_NOTICE)
            .map((integer: Integer): Scalar<Pitch> =>
                as.Scalar<Pitch>(as.number(pow(
                    pitchStep,
                    as.Power<Frequency>(integer),
                ))),
            )

export {
    computePitchScalars,
}
