import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    StandardSpecs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Base, Cardinal } from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../nominals'

enum DeletionStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

enum HafuhafuSpec {
    DELETION_STYLE = 'deletionStyle',
    SIEVE_CYCLE_REPETITIONS = 'sieveCycleRepetitions',
    KERNEL = 'kernel',
    PITCH_STEP = 'pitchStep',
    REVERSED = 'reversed',
    SIEVE = 'sieve',
}

interface HafuhafuSpecs extends StandardSpecs {
    [ HafuhafuSpec.DELETION_STYLE ]: DeletionStyle,
    [ HafuhafuSpec.SIEVE_CYCLE_REPETITIONS ]: Cardinal,
    [ HafuhafuSpec.KERNEL ]: Kernel,
    [ HafuhafuSpec.PITCH_STEP ]: Base,
    [ HafuhafuSpec.REVERSED ]: boolean,
    [ HafuhafuSpec.SIEVE ]: Sieve,
}

interface HafuhafuConfigurations extends Configurations<HafuhafuSpecs> {
    [ HafuhafuSpec.DELETION_STYLE ]: OptionedConfiguration,
    [ HafuhafuSpec.SIEVE_CYCLE_REPETITIONS ]: RangedConfiguration,
    [ HafuhafuSpec.KERNEL ]: RangedConfiguration,
    [ HafuhafuSpec.PITCH_STEP ]: RangedConfiguration,
    [ HafuhafuSpec.REVERSED ]: ToggledConfiguration,
    [ HafuhafuSpec.SIEVE ]: RangedConfiguration,
}

export {
    DeletionStyle,
    HafuhafuSpecs,
    HafuhafuConfigurations,
    HafuhafuSpec,
}
