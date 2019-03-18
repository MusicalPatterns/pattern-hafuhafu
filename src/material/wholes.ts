import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import { ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import { computeKernelIteration } from './pieces'

const computeKernelIterations:
    (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs) => ContourWhole<PitchDurationGainSustain> =
    (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs): ContourWhole<PitchDurationGainSustain> => {
        const kernelIterations: Array<ContourPiece<PitchDurationGainSustain>> = kernelCycle.map(
            (cycleKernel: Kernel): ContourPiece<PitchDurationGainSustain> =>
                computeKernelIteration(cycleKernel, specs))

        return to.ContourWhole<PitchDurationGainSustain>(sequence(...kernelIterations))
    }

export {
    computeKernelIterations,
}
