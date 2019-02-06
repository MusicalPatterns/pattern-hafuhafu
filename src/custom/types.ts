import { Block, Cardinal, Ordinal, Scalar } from '@musical-patterns/utilities'
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
    cellCount: Cardinal,
    deletionStyle: DeletionStyle,
    iterationLength: Cardinal,
    partIndex: Ordinal,
}

export {
    HafuhafuContourElement,
    HafuhafuContourParameters,
}
