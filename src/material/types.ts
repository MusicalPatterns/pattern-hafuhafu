import { Block, Cardinal, Ordinal } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'

interface HafuhafuContourParameters {
    cellCount: Cardinal,
    cycleBlock: Block,
    partIndex: Ordinal,
    spec: HafuhafuSpec,
}

export {
    HafuhafuContourParameters,
}
