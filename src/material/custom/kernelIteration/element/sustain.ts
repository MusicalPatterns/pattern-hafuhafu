import { reciprocal, Scalar, Time, to } from '@musical-patterns/utilities'
import { from as hafuhafuFrom } from '../../../../nominals'
import { ComputeKernelIterationElementSustainParameters } from './types'

const computeKernelIterationElementSustain:
    (parameters: ComputeKernelIterationElementSustainParameters) => Scalar<Time> =
    ({ sieve }: ComputeKernelIterationElementSustainParameters): Scalar<Time> =>
        to.Scalar(to.Time(hafuhafuFrom.Sieve(reciprocal(sieve))))

export {
    computeKernelIterationElementSustain,
}
