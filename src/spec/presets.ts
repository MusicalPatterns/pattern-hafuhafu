// tslint:disable max-file-line-count

import { Preset, StandardSpec } from '@musical-patterns/pattern'
import { ObjectOf } from '@musical-patterns/utilities'
import {
    AASB_KERNELWISE_PRESET_KERNEL,
    AASB_KERNELWISE_PRESET_SIEVE_FRACTAL_REPETITIONS,
    AASB_SIEVEWISE_PRESET_SIEVE,
    CATERPILLAR_PRESET_BASE_DURATION,
    CATERPILLAR_PRESET_BASE_FREQUENCY,
    CATERPILLAR_PRESET_KERNEL,
    CATERPILLAR_PRESET_LAYER_COUNT,
    CATERPILLAR_PRESET_SIEVE_FRACTAL_REPETITIONS,
    CHORTLES_PRESET_BASE_DURATION,
    CHORTLES_PRESET_BASE_FREQUENCY,
    CHORTLES_PRESET_KERNEL,
    CHORTLES_PRESET_LAYER_COUNT,
    MONOCOT_PRESET_KERNEL,
    MONOCOT_PRESET_SIEVE,
    MONOCOT_PRESET_SIEVE_FRACTAL_REPETITIONS,
    POPCORN_PRESET_BASE_DURATION,
    POPCORN_PRESET_BASE_FREQUENCY,
    POPCORN_PRESET_KERNEL,
    POPCORN_PRESET_SIEVE,
    POPCORN_PRESET_SIEVE_FRACTAL_REPETITIONS,
    RECURSIEVE_PRESET_BASE_DURATION,
    RECURSIEVE_PRESET_BASE_FREQUENCY,
    RECURSIEVE_PRESET_KERNEL,
    RECURSIEVE_PRESET_LAYER_COUNT,
    RECURSIEVE_PRESET_SIEVE_FRACTAL_REPETITIONS,
    SCALE_SCRAMBLE_PRESET_BASE_DURATION,
    SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY,
    SCALE_SCRAMBLE_PRESET_KERNEL,
    SCALE_SCRAMBLE_PRESET_PITCH_STEP,
    SCALE_SCRAMBLE_PRESET_SIEVE,
    SCALE_SCRAMBLE_PRESET_SIEVE_FRACTAL_REPETITIONS,
    SHOW_TEXTURE_LAYER_COUNT,
    SHOW_TEXTURE_PRESET_BASE_DURATION,
    SHOW_TEXTURE_PRESET_BASE_FREQUENCY,
    SHOW_TEXTURE_PRESET_KERNEL,
    SHOW_TEXTURE_SIEVE_FRACTAL_REPETITIONS,
    SIEVELIZATION_III_PRESET_BASE_DURATION,
    SIEVELIZATION_III_PRESET_KERNEL,
    SIEVELIZATION_III_PRESET_LAYER_COUNT,
    SIEVELIZATION_III_PRESET_PITCH_STEP,
    SIEVELIZATION_III_PRESET_SIEVE,
    SIEVELIZATION_III_PRESET_SIEVE_FRACTAL_REPETITIONS,
    THREE_PHASER_PRESET_KERNEL,
    THREE_PHASER_PRESET_SIEVE_FRACTAL_REPETITIONS,
} from './constants'
import { initialSpecs } from './initials'
import { presetsOrder } from './orders'
import { HafuhafuMode, HafuhafuPreset, HafuhafuSpec, HafuhafuSpecs } from './types'

const presets: ObjectOf<Preset<HafuhafuSpecs>> = {
    [ HafuhafuPreset.AASB_KERNELWISE ]: {
        description: 'as above so below - with a kernel which cycles directly into itself',
        order: presetsOrder.indexOf(HafuhafuPreset.AASB_KERNELWISE),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SOURCE_KERNEL ]: AASB_KERNELWISE_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: AASB_KERNELWISE_PRESET_SIEVE_FRACTAL_REPETITIONS,
        },
    },
    [ HafuhafuPreset.AASB_SIEVEWISE ]: {
        description: 'as above so below - with a sieve that takes each next note in the original kernel',
        order: presetsOrder.indexOf(HafuhafuPreset.AASB_SIEVEWISE),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SIEVE ]: AASB_SIEVEWISE_PRESET_SIEVE,
        },
    },
    [ HafuhafuPreset.CHORTLES ]: {
        description: 'as above so below - with a sieve that takes each next note in the original kernel',
        order: presetsOrder.indexOf(HafuhafuPreset.CHORTLES),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.LAYER_COUNT ]: CHORTLES_PRESET_LAYER_COUNT,
            [ HafuhafuSpec.SOURCE_KERNEL ]: CHORTLES_PRESET_KERNEL,
            [ StandardSpec.BASE_FREQUENCY ]: CHORTLES_PRESET_BASE_FREQUENCY,
            [ StandardSpec.BASE_DURATION ]: CHORTLES_PRESET_BASE_DURATION,
        },
    },
    [ HafuhafuPreset.RECURSIEVE ]: {
        description: 'demonstration of the droste mode',
        order: presetsOrder.indexOf(HafuhafuPreset.RECURSIEVE),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SOURCE_KERNEL ]: RECURSIEVE_PRESET_KERNEL,
            [ HafuhafuSpec.MODE ]: HafuhafuMode.DROSTE,
            [ HafuhafuSpec.LAYER_COUNT ]: RECURSIEVE_PRESET_LAYER_COUNT,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: RECURSIEVE_PRESET_SIEVE_FRACTAL_REPETITIONS,
            [ HafuhafuSpec.REVERSE ]: true,
            [ StandardSpec.BASE_DURATION ]: RECURSIEVE_PRESET_BASE_DURATION,
            [ StandardSpec.BASE_FREQUENCY ]: RECURSIEVE_PRESET_BASE_FREQUENCY,
        },
    },
    [ HafuhafuPreset.MONOCOT ]: {
        description: 'sieve does all the work',
        order: presetsOrder.indexOf(HafuhafuPreset.MONOCOT),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SOURCE_KERNEL ]: MONOCOT_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: MONOCOT_PRESET_SIEVE,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: MONOCOT_PRESET_SIEVE_FRACTAL_REPETITIONS,
        },
    },
    [ HafuhafuPreset.POPCORN ]: {
        description: 'thanks to Gershon Kingsley',
        order: presetsOrder.indexOf(HafuhafuPreset.POPCORN),
        specs: {
            ...initialSpecs,
            [ StandardSpec.BASE_DURATION ]: POPCORN_PRESET_BASE_DURATION,
            [ StandardSpec.BASE_FREQUENCY ]: POPCORN_PRESET_BASE_FREQUENCY,
            [ HafuhafuSpec.SOURCE_KERNEL ]: POPCORN_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: POPCORN_PRESET_SIEVE,
            [ HafuhafuSpec.REVERSE ]: true,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: POPCORN_PRESET_SIEVE_FRACTAL_REPETITIONS,
        },
    },
    [ HafuhafuPreset.SCALE_SCRAMBLE ]: {
        description: 'thanks to Gershon Kingsley',
        order: presetsOrder.indexOf(HafuhafuPreset.SCALE_SCRAMBLE),
        specs: {
            ...initialSpecs,
            [ StandardSpec.BASE_FREQUENCY ]: SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY,
            [ StandardSpec.BASE_DURATION ]: SCALE_SCRAMBLE_PRESET_BASE_DURATION,
            [ HafuhafuSpec.SOURCE_KERNEL ]: SCALE_SCRAMBLE_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: SCALE_SCRAMBLE_PRESET_SIEVE,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: SCALE_SCRAMBLE_PRESET_SIEVE_FRACTAL_REPETITIONS,
            [ HafuhafuSpec.PITCH_STEP ]: SCALE_SCRAMBLE_PRESET_PITCH_STEP,
        },
    },
    [ HafuhafuPreset.SHOW_TEXTURE ]: {
        description: 'minimal kernel demonstrates the shape of the sieve fractal',
        order: presetsOrder.indexOf(HafuhafuPreset.SHOW_TEXTURE),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SOURCE_KERNEL ]: SHOW_TEXTURE_PRESET_KERNEL,
            [ HafuhafuSpec.MODE ]: HafuhafuMode.DROSTE,
            [ HafuhafuSpec.LAYER_COUNT ]: SHOW_TEXTURE_LAYER_COUNT,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: SHOW_TEXTURE_SIEVE_FRACTAL_REPETITIONS,
            [ HafuhafuSpec.STRETCH_PITCH ]: true,
            [ StandardSpec.BASE_DURATION ]: SHOW_TEXTURE_PRESET_BASE_DURATION,
            [ StandardSpec.BASE_FREQUENCY ]: SHOW_TEXTURE_PRESET_BASE_FREQUENCY,
        },
    },
    [ HafuhafuPreset.THREE_PHASER ]: {
        description: 'kernel cycles through three versions which are not rotations of each other',
        order: presetsOrder.indexOf(HafuhafuPreset.THREE_PHASER),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SOURCE_KERNEL ]: THREE_PHASER_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: THREE_PHASER_PRESET_SIEVE_FRACTAL_REPETITIONS,
        },
    },
    [ HafuhafuPreset.CATERPILLAR ]: {
        description: 'a purely rhythmic hafuhafu endeavour',
        order: presetsOrder.indexOf(HafuhafuPreset.CATERPILLAR),
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.LAYER_COUNT ]: CATERPILLAR_PRESET_LAYER_COUNT,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: CATERPILLAR_PRESET_SIEVE_FRACTAL_REPETITIONS,
            [ HafuhafuSpec.SOURCE_KERNEL ]: CATERPILLAR_PRESET_KERNEL,
            [ StandardSpec.BASE_DURATION ]: CATERPILLAR_PRESET_BASE_DURATION,
            [ StandardSpec.BASE_FREQUENCY ]: CATERPILLAR_PRESET_BASE_FREQUENCY,
        },
    },
    [ HafuhafuPreset.SIEVELIZATION_III ]: {
        description: 'a demonstration of the power of sieves greater than 2 in droste mode',
        formattedName: 'Sievelization III',
        specs: {
            ...initialSpecs,
            [ StandardSpec.BASE_DURATION ]: SIEVELIZATION_III_PRESET_BASE_DURATION,
            [ HafuhafuSpec.PITCH_STEP ]: SIEVELIZATION_III_PRESET_PITCH_STEP,
            [ HafuhafuSpec.SOURCE_KERNEL ]: SIEVELIZATION_III_PRESET_KERNEL,
            [ HafuhafuSpec.MODE ]: HafuhafuMode.DROSTE,
            [ HafuhafuSpec.LAYER_COUNT ]: SIEVELIZATION_III_PRESET_LAYER_COUNT,
            [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: SIEVELIZATION_III_PRESET_SIEVE_FRACTAL_REPETITIONS,
            [ HafuhafuSpec.STRETCH_PITCH ]: true,
            [ HafuhafuSpec.SIEVE ]: SIEVELIZATION_III_PRESET_SIEVE,
        },
    },
}

export {
    presets,
}
