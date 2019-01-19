import {
    RangedPatternSpecPropertyAttributes,
    StandardPatternSpec,
    StandardPatternSpecAttributes,
} from '@musical-patterns/pattern'
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

interface HafuhafuPatternSpec extends StandardPatternSpec {
    block: Block,
    iterationLength: Count,
}

interface HafuhafuPatternSpecAttributes extends StandardPatternSpecAttributes {
    block: RangedPatternSpecPropertyAttributes,
    iterationLength: RangedPatternSpecPropertyAttributes,
}

type Cycle = Block[]

export {
    Cycle,
    Direction,
    BuildNoteSpecParameters,
    HafuhafuPatternSpec,
    HafuhafuPatternSpecAttributes,
}
