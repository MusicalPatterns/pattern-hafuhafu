import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import { Amplitude, ContourElement, Frequency, from, Scalar, Time, to } from '@musical-patterns/utilities'
import {
    computeKernelIterationElementDuration,
    computeKernelIterationElementGain,
    computeKernelIterationElementPitch,
    computeKernelIterationElementSustain,
} from './custom'
import { ComputeElementParameters } from './types'

const computeKernelIterationElement:
    (parameters: ComputeElementParameters) => ContourElement<PitchDurationGainSustain> =
    (parameters: ComputeElementParameters): ContourElement<PitchDurationGainSustain> => {
        const {
            cycleKernel,
            deletionStyle,
            kernelIterationElementIndex,
            kernelIterationDurationProgress,
            reversed,
            sieve,
            sieveCycleRepetitions,
        } = parameters

        const kernelIterationElementDuration: Scalar<Time> = computeKernelIterationElementDuration({
            cycleKernel,
            kernelIterationElementIndex,
            reversed,
            sieve,
            sieveCycleRepetitions,
        })
        const kernelIterationElementSustain: Scalar<Time> = computeKernelIterationElementSustain({ sieve })
        const kernelIterationElementGain: Scalar<Amplitude> = computeKernelIterationElementGain({
            deletionStyle,
            kernelIterationDurationProgress,
            kernelIterationElementIndex,
            reversed,
            sieve,
        })
        const kernelIterationElementPitch: Scalar<Frequency> = computeKernelIterationElementPitch({
            cycleKernel,
            kernelIterationElementIndex,
        })

        return to.ContourElement<PitchDurationGainSustain>([
            from.Scalar(from.Frequency<Scalar, Scalar<Frequency>>(kernelIterationElementPitch)),
            from.Scalar(from.Time<Scalar, Scalar<Time>>(kernelIterationElementDuration)),
            from.Scalar(from.Amplitude<Scalar, Scalar<Amplitude>>(kernelIterationElementGain)),
            from.Scalar(from.Time<Scalar, Scalar<Time>>(kernelIterationElementSustain)),
        ])
    }

export {
    computeKernelIterationElement,
}
