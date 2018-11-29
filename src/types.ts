import { Count, Index, PatternSpec, Scalar } from '@musical-patterns/utilities'
import { Block } from '../../../nominal'

enum Direction {
    IN = 'IN',
    OUT = 'OUT',
}

interface BuildHafuhafuNoteSpecParameters {
    cell: Index,
    duration: Scalar,
    gain: Scalar,
    pitch: Scalar,
    sustain: Scalar,
}

interface HafuhafuPatternSpec extends PatternSpec {
    block: Block,
    iterationLength: Count,
}

type Cycle = Block[]

export {
    Cycle,
    Direction,
    BuildHafuhafuNoteSpecParameters,
    HafuhafuPatternSpec,
}
