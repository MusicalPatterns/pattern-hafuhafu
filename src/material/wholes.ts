import { PitchDurationGainSustainScale } from '@musical-patterns/pattern'
import { Block, ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeKernelCycle } from './custom'
import { computePieces } from './pieces'

const computeWholes: (specs: HafuhafuSpecs) => ContourWhole<PitchDurationGainSustainScale> =
    (specs: HafuhafuSpecs): ContourWhole<PitchDurationGainSustainScale> => {
        const kernelCycle: Cycle<Block> = computeKernelCycle(specs)
        const pieces: Array<ContourPiece<PitchDurationGainSustainScale>> = kernelCycle.map(
            (iterationKernel: Block): ContourPiece<PitchDurationGainSustainScale> =>
                computePieces(iterationKernel, specs),
        )

        return to.ContourWhole<PitchDurationGainSustainScale>(sequence(...pieces))
    }

export {
    computeWholes,
}
