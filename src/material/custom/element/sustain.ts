import { reciprocal, Scalar, Time, to } from '@musical-patterns/utilities'
import { from as hafuhafuFrom } from '../../../nominals'
import { ComputeSustainParameters } from './types'

const computeSustain: (parameters: ComputeSustainParameters) => Scalar<Time> =
    ({ sieve }: ComputeSustainParameters): Scalar<Time> =>
        to.Scalar(to.Time(hafuhafuFrom.Sieve(reciprocal(sieve))))

export {
    computeSustain,
}
