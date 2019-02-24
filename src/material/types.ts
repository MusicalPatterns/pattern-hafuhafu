import { Block, Cardinal, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'

interface HafuhafuContourParameters {
    cellCount: Cardinal,
    cycleBlock: Block,
    partIndex: Ordinal,
    spec: HafuhafuSpec,
}

export {
    HafuhafuContourParameters,
}
