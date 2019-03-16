import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Base, Cardinal } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

interface HafuhafuSpecs extends Specs {
    deletionStyle: DeletionStyle,
    iterationLength: Cardinal,
    kernel: Kernel,
    pitchStep: Base,
    reversed: boolean,
}

interface HafuhafuConfigurations extends Configurations<HafuhafuSpecs> {
    deletionStyle: OptionedConfiguration,
    iterationLength: RangedConfiguration,
    kernel: RangedConfiguration,
    pitchStep: RangedConfiguration,
    reversed: ToggledConfiguration,
}

export {
    DeletionStyle,
    HafuhafuSpecs,
    HafuhafuConfigurations,
}
