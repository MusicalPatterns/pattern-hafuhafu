import {
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
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

interface HafuhafuSpec extends Spec {
    block: Block,
    iterationLength: Count,
}

interface HafuhafuSpecAttributes extends SpecAttributes {
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
