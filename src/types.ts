import {
    OptionedSpecPropertyAttributes,
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
} from '@musical-patterns/pattern'
import { Base, Block, Count, Scalar } from '@musical-patterns/utilities'

enum Direction {
    IN = 'IN',
    OUT = 'OUT',
}

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
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
    deletionStyle: DeletionStyle,
    iterationLength: Count,
    pitchStep: Base,
}

interface HafuhafuSpecAttributes extends SpecAttributes {
    block: RangedSpecPropertyAttributes,
    deletionStyle: OptionedSpecPropertyAttributes,
    iterationLength: RangedSpecPropertyAttributes,
    pitchStep: RangedSpecPropertyAttributes,
}

type Cycle = Block[]

export {
    Cycle,
    DeletionStyle,
    Direction,
    BuildNoteSpecParameters,
    HafuhafuSpec,
    HafuhafuSpecAttributes,
}
