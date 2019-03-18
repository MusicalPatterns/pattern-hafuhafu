import { FULL_GAIN, SILENT } from '@musical-patterns/pattern'
import { Amplitude, dividesEvenly, from, invertNormalScalar, random, Scalar, to } from '@musical-patterns/utilities'
import { DeletionStyle } from '../../../../spec'
import { ComputeKernelIterationElementGainParameters } from './types'

const computeRandomDropGain: (
    parameters: { fadingGain: Scalar<Amplitude>, randomizingFunction: (within?: number) => number },
) => Scalar<Amplitude> =
    ({ fadingGain, randomizingFunction }: {
        fadingGain: Scalar<Amplitude>,
        randomizingFunction: (within?: number) => number,
    }): Scalar<Amplitude> =>
        randomizingFunction() < from.Scalar(from.Amplitude<Scalar, Scalar<Amplitude>>(fadingGain)) ?
            FULL_GAIN :
            SILENT

const computeKernelIterationElementGain:
    (parameters: ComputeKernelIterationElementGainParameters) => Scalar<Amplitude> =
    (parameters: ComputeKernelIterationElementGainParameters): Scalar<Amplitude> => {
        const {
            deletionStyle,
            kernelIterationDurationProgress,
            kernelIterationElementIndex,
            reversed,
            sieve,
        } = parameters

        if (dividesEvenly(kernelIterationElementIndex, sieve)) {
            return FULL_GAIN
        }

        const fadingGain: Scalar<Amplitude> = to.Scalar(to.Amplitude(from.NormalScalar(
            reversed ?
                kernelIterationDurationProgress :
                invertNormalScalar(kernelIterationDurationProgress),
        )))

        return deletionStyle === DeletionStyle.FADE ?
            fadingGain :
            computeRandomDropGain({ fadingGain, randomizingFunction: random })
    }

export {
    computeKernelIterationElementGain,
    computeRandomDropGain,
}
