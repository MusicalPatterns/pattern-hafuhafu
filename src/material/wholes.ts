import { PitchDurationGain } from '@musical-patterns/pattern'
import { Block, ContourPiece, ContourWhole, Cycle, sequence, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'
import { buildPiece } from './pieces'

const buildWhole: (cycle: Cycle<Block>, spec: HafuhafuSpec) => ContourWhole<PitchDurationGain> =
    (cycle: Cycle<Block>, spec: HafuhafuSpec): ContourWhole<PitchDurationGain> => {
        const iterations: Array<ContourPiece<PitchDurationGain>> = cycle.map(
            (cycleBlock: Block): ContourPiece<PitchDurationGain> =>
                buildPiece(cycleBlock, spec))

        return to.ContourWhole<PitchDurationGain>(sequence(iterations))
    }

export {
    buildWhole,
}
