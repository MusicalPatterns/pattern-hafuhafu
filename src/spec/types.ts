import {
    Configurations,
    OptionedConfiguration,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/spec'
import { Block, Cardinal, Frequency, Logarithm } from '@musical-patterns/utilities'
import { Layer } from '../nominals'
import { Sieve, SieveFractalRepetitions } from '../types'

enum ExistenceStyle {
    FADE = 'FADE',
    RANDOM_DROP = 'RANDOM_DROP',
}

enum HafuhafuMode {
    DROSTE = 'DROSTE',
    ZENO = 'ZENO',
}

enum HafuhafuSpec {
    SOURCE_KERNEL = 'sourceKernel',
    SIEVE = 'sieve',
    MODE = 'mode',
    PITCH_STEP = 'pitchStep',
    REVERSE = 'reverse',
    EXISTENCE_STYLE = 'existenceStyle',
    SIEVE_FRACTAL_REPETITIONS = 'sieveFractalRepetitions',
    LAYER_COUNT = 'layerCount',
    STRETCH_PITCH = 'stretchPitch',
}

interface HafuhafuSpecs extends Specs {
    [ HafuhafuSpec.EXISTENCE_STYLE ]: ExistenceStyle,
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: SieveFractalRepetitions,
    [ HafuhafuSpec.SOURCE_KERNEL ]: Block,
    [ HafuhafuSpec.PITCH_STEP ]: Logarithm<Frequency>,
    [ HafuhafuSpec.REVERSE ]: boolean,
    [ HafuhafuSpec.SIEVE ]: Sieve,
    [ HafuhafuSpec.MODE ]: HafuhafuMode,
    [ HafuhafuSpec.LAYER_COUNT ]: Cardinal<Layer[]>,
    [ HafuhafuSpec.STRETCH_PITCH ]: boolean,
}

interface HafuhafuConfigurations extends Configurations<HafuhafuSpecs> {
    [ HafuhafuSpec.EXISTENCE_STYLE ]: OptionedConfiguration,
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: RangedConfiguration,
    [ HafuhafuSpec.SOURCE_KERNEL ]: RangedConfiguration,
    [ HafuhafuSpec.PITCH_STEP ]: RangedConfiguration,
    [ HafuhafuSpec.REVERSE ]: ToggledConfiguration,
    [ HafuhafuSpec.SIEVE ]: RangedConfiguration,
    [ HafuhafuSpec.MODE ]: OptionedConfiguration,
    [ HafuhafuSpec.LAYER_COUNT ]: RangedConfiguration,
    [ HafuhafuSpec.STRETCH_PITCH ]: ToggledConfiguration,
}

enum HafuhafuPreset {
    AASB_KERNELWISE = 'AASB_KERNELWISE',
    AASB_SIEVEWISE = 'AASB_SIEVEWISE',
    CHORTLES = 'CHORTLES',
    RECURSIEVE = 'RECURSIEVE',
    MONOCOT = 'MONOCOT',
    POPCORN = 'POPCORN',
    SCALE_SCRAMBLE = 'SCALE_SCRAMBLE',
    SHOW_TEXTURE = 'SHOW_TEXTURE',
    THREE_PHASER = 'THREE_PHASER',
    CATERPILLAR = 'CATERPILLAR',
    SIEVELIZATION_III = 'SIEVELIZATION_III',
}

export {
    ExistenceStyle,
    HafuhafuSpecs,
    HafuhafuConfigurations,
    HafuhafuSpec,
    HafuhafuMode,
    HafuhafuPreset,
}
