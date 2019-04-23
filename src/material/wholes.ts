import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import { as, Block, ContourPiece, ContourWhole, Cycle, sequence } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeKernelCycle } from './custom'
import { computePiece } from './pieces'

const computeWholes: (specs: HafuhafuSpecs) => ContourWhole<PitchDurationGainSustainScale> =
    (specs: HafuhafuSpecs): ContourWhole<PitchDurationGainSustainScale> => {
        const kernelCycle: Cycle<Block> = computeKernelCycle(specs)
        const pieces: Array<ContourPiece<PitchDurationGainSustainScale>> = kernelCycle.map(
            (iterationKernel: Block): ContourPiece<PitchDurationGainSustainScale> =>
                computePiece(iterationKernel, specs),
        )

        return as.ContourWhole<PitchDurationGainSustainScale>(sequence(...pieces))
    }

export {
    computeWholes,
}
