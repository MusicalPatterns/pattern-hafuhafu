import { Block, PatternSpec } from '@musical-patterns/pattern'
import { Count, Index, Scalar } from '@musical-patterns/utilities'

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
