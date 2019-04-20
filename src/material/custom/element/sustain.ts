import { insteadOf, Multiple, Ordinal, reciprocal, Scalar, Time } from '@musical-patterns/utilities'
import { ComputeSustainParameters } from './types'

const computeSustain: (parameters: { sieve: Multiple<Ordinal> }) => Scalar<Time> =
    ({ sieve }: ComputeSustainParameters): Scalar<Time> =>
        insteadOf<Scalar, Time>(reciprocal(sieve))

export {
    computeSustain,
}
