import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Base, Block, Cardinal } from '@musical-patterns/utilities'

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

interface HafuhafuSpecs extends Specs {
    block: Block,
    deletionStyle: DeletionStyle,
    iterationLength: Cardinal,
    pitchStep: Base,
    reversed: boolean,
}

interface HafuhafuConfigurations extends Configurations<HafuhafuSpecs> {
    block: RangedConfiguration,
    deletionStyle: OptionedConfiguration,
    iterationLength: RangedConfiguration,
    pitchStep: RangedConfiguration,
    reversed: ToggledConfiguration,
}

export {
    DeletionStyle,
    HafuhafuSpecs,
    HafuhafuConfigurations,
}
