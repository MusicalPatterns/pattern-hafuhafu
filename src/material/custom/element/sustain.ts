import { from, Multiple, of, Ordinal, reciprocal, Scalar, Time, to } from '@musical-patterns/utilities'
import { ComputeSustainParameters } from './types'

const computeSustain: (parameters: { sieve: Multiple<Ordinal> }) => Scalar<Time> =
    ({ sieve }: ComputeSustainParameters): Scalar<Time> =>
        to.Scalar(of.Time(from.Multiple<Ordinal>(reciprocal(sieve))))

export {
    computeSustain,
}
