import { Block, Count, Index, Scalar } from '@musical-patterns/utilities'
import { DeletionStyle } from '../types'

interface HafuhafuContourElement {
    cell: number,
    duration: Scalar,
    gain: Scalar,
    pitch: Scalar,
    sustain: Scalar,
}

interface HafuhafuContourParameters {
    block: Block,
    cellCount: Count,
    deletionStyle: DeletionStyle,
    iterationLength: Count,
    partIndex: Index,
}

export {
    HafuhafuContourElement,
    HafuhafuContourParameters,
}
