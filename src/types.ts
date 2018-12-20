import { PatternSpec } from '@musical-patterns/pattern'
import { Block, Count, Scalar } from '@musical-patterns/utilities'

enum Direction {
    IN = 'IN',
    OUT = 'OUT',
}

interface BuildNoteSpecParameters {
    cell: number,
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
    BuildNoteSpecParameters,
    HafuhafuPatternSpec,
}
