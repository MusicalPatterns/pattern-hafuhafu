import {
    OptionedSpecPropertyAttributes,
    RangedSpecPropertyAttributes,
    SpecAttributesFor,
    StandardSpec,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Base, Block, Cardinal } from '@musical-patterns/utilities'

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

interface HafuhafuSpec extends StandardSpec {
    block: Block,
    deletionStyle: DeletionStyle,
    iterationLength: Cardinal,
    pitchStep: Base,
    reversed: boolean,
}

interface HafuhafuSpecAttributes extends SpecAttributesFor<HafuhafuSpec> {
    block: RangedSpecPropertyAttributes,
    deletionStyle: OptionedSpecPropertyAttributes,
    iterationLength: RangedSpecPropertyAttributes,
    pitchStep: RangedSpecPropertyAttributes,
    reversed: ToggledSpecPropertyAttributes,
}

export {
    DeletionStyle,
    HafuhafuSpec,
    HafuhafuSpecAttributes,
}
