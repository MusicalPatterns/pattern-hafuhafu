import { Block, Index, Scalar } from '../../../src'
import { PatternSpec } from '../../types'

enum Direction {
    IN = 'in',
    OUT = 'out',
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
}

type Cycle = Block[]

export {
    Cycle,
    Direction,
    BuildHafuhafuNoteSpecParameters,
    HafuhafuPatternSpec,
}
