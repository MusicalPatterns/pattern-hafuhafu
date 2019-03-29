import { reciprocal, Scalar, Time, to } from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Sieve } from '../../../nominals'
import { ComputeSustainParameters } from './types'

const computeSustain: (parameters: { sieve: Sieve }) => Scalar<Time> =
    ({ sieve }: ComputeSustainParameters): Scalar<Time> =>
        to.Scalar(to.Time(hafuhafuFrom.Sieve(reciprocal(sieve))))

export {
    computeSustain,
}
