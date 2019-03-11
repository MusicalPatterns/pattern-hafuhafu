import { PitchDurationGain } from '@musical-patterns/pattern'
import { Block, ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { computePiece } from './pieces'

const computeWhole: (cycle: Cycle<Block>, spec: HafuhafuSpec) => ContourWhole<PitchDurationGain> =
    (cycle: Cycle<Block>, spec: HafuhafuSpec): ContourWhole<PitchDurationGain> => {
        const iterations: Array<ContourPiece<PitchDurationGain>> = cycle.map(
            (cycleBlock: Block): ContourPiece<PitchDurationGain> =>
                computePiece(cycleBlock, spec))

        return to.ContourWhole<PitchDurationGain>(sequence(iterations))
    }

export {
    computeWhole,
}
