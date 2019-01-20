import {
    RangedSpecPropertyAttributes,
    StandardSpec,
    StandardSpecAttributes,
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

interface HafuhafuSpec extends StandardSpec {
    block: Block,
    iterationLength: Count,
}

interface HafuhafuSpecAttributes extends StandardSpecAttributes {
    block: RangedSpecPropertyAttributes,
    iterationLength: RangedSpecPropertyAttributes,
}

type Cycle = Block[]

export {
    Cycle,
    Direction,
    BuildNoteSpecParameters,
    HafuhafuSpec,
    HafuhafuSpecAttributes,
}
