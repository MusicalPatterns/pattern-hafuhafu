import { PitchDurationGain } from '@musical-patterns/pattern'
import { ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import { computePiece } from './pieces'

const computeWhole: (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs) => ContourWhole<PitchDurationGain> =
    (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs): ContourWhole<PitchDurationGain> => {
        const iterations: Array<ContourPiece<PitchDurationGain>> = kernelCycle.map(
            (kernel: Kernel): ContourPiece<PitchDurationGain> =>
                computePiece(kernel, specs))

        return to.ContourWhole<PitchDurationGain>(sequence(...iterations))
    }

export {
    computeWhole,
}
