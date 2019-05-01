import { insteadOf, reciprocal, Scalar, Value } from '@musical-patterns/utilities'
import { Sieve } from '../../../types'
import { ComputeSustainParameters } from './types'

const computeEnvelope: (parameters: { sieve: Sieve }) => Scalar<Value> =
    ({ sieve }: ComputeSustainParameters): Scalar<Value> =>
        insteadOf<Scalar, Value>(reciprocal(sieve))

export {
    computeEnvelope,
}
