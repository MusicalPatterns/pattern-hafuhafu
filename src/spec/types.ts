import {
    Attributes,
    OptionedPropertyAttributes,
    RangedPropertyAttributes,
    Spec,
    ToggledPropertyAttributes,
} from '@musical-patterns/pattern'
import { Base, Block, Cardinal } from '@musical-patterns/utilities'

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

interface HafuhafuSpec extends Spec {
    block: Block,
    deletionStyle: DeletionStyle,
    iterationLength: Cardinal,
    pitchStep: Base,
    reversed: boolean,
}

interface HafuhafuAttributes extends Attributes<HafuhafuSpec> {
    block: RangedPropertyAttributes,
    deletionStyle: OptionedPropertyAttributes,
    iterationLength: RangedPropertyAttributes,
    pitchStep: RangedPropertyAttributes,
    reversed: ToggledPropertyAttributes,
}

export {
    DeletionStyle,
    HafuhafuSpec,
    HafuhafuAttributes,
}
