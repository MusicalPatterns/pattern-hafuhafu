import { PitchDurationGain } from '@musical-patterns/pattern'
import { Block, ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computePiece } from './pieces'

const computeWhole: (cycle: Cycle<Block>, specs: HafuhafuSpecs) => ContourWhole<PitchDurationGain> =
    (cycle: Cycle<Block>, specs: HafuhafuSpecs): ContourWhole<PitchDurationGain> => {
        const iterations: Array<ContourPiece<PitchDurationGain>> = cycle.map(
            (cycleBlock: Block): ContourPiece<PitchDurationGain> =>
                computePiece(cycleBlock, specs))

        return to.ContourWhole<PitchDurationGain>(sequence(...iterations))
    }

export {
    computeWhole,
}
