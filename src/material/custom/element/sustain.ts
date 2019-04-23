import { insteadOf, reciprocal, Scalar, Time } from '@musical-patterns/utilities'
import { Sieve } from '../../../types'
import { ComputeSustainParameters } from './types'

const computeSustain: (parameters: { sieve: Sieve }) => Scalar<Time> =
    ({ sieve }: ComputeSustainParameters): Scalar<Time> =>
        insteadOf<Scalar, Time>(reciprocal(sieve))

export {
    computeSustain,
}
