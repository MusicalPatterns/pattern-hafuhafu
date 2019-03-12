import { Block, Cardinal, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'

interface HafuhafuContourParameters {
    cellCount: Cardinal,
    cycleBlock: Block,
    pieceIndex: Ordinal,
    specs: HafuhafuSpecs,
}

export {
    HafuhafuContourParameters,
}
