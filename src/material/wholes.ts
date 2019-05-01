import { PitchValueIntensityEnvelopeScale } from '@musical-patterns/material'
import { as, Block, ContourPiece, ContourWhole, Cycle, sequence } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeKernelCycle } from './custom'
import { computePiece } from './pieces'

const computeWholes: (specs: HafuhafuSpecs) => ContourWhole<PitchValueIntensityEnvelopeScale> =
    (specs: HafuhafuSpecs): ContourWhole<PitchValueIntensityEnvelopeScale> => {
        const kernelCycle: Cycle<Block> = computeKernelCycle(specs)
        const pieces: Array<ContourPiece<PitchValueIntensityEnvelopeScale>> = kernelCycle.map(
            (iterationKernel: Block): ContourPiece<PitchValueIntensityEnvelopeScale> =>
                computePiece(iterationKernel, specs),
        )

        return as.ContourWhole<PitchValueIntensityEnvelopeScale>(sequence(...pieces))
    }

export {
    computeWholes,
}
