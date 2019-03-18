import { Preset, StandardSpec } from '@musical-patterns/pattern'
import { ObjectOf } from '@musical-patterns/utilities'
import {
    AASB_KERNELWISE_PRESET_KERNEL,
    AASB_SIEVEWISE_PRESET_SIEVE,
    MONOCOT_PRESET_KERNEL,
    MONOCOT_PRESET_SIEVE,
    POPCORN_PRESET_BASE_FREQUENCY,
    POPCORN_PRESET_KERNEL,
    POPCORN_PRESET_SIEVE,
    SCALE_SCRAMBLE_PRESET_BASE_DURATION,
    SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY,
    SCALE_SCRAMBLE_PRESET_KERNEL,
    SCALE_SCRAMBLE_PRESET_PITCH_STEP,
    SCALE_SCRAMBLE_PRESET_SIEVE,
    SCALE_SCRAMBLE_PRESET_SIEVE_CYCLE_REPETITIONS,
    THREE_PHASER_PRESET_KERNEL,
} from './constants'
import { initialSpecs } from './initials'
import { HafuhafuSpec, HafuhafuSpecs } from './types'

const presets: ObjectOf<Preset<HafuhafuSpecs>> = {
    aasbKernelwise: {
        description: 'as above so below - with a kernel which cycles directly into itself',
        order: 3,
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.KERNEL ]: AASB_KERNELWISE_PRESET_KERNEL,
        },
    },
    aasbSievewise: {
        description: 'as above so below - with a sieve that takes each next note in the original kernel',
        order: 2,
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.SIEVE ]: AASB_SIEVEWISE_PRESET_SIEVE,
        },
    },
    monocot: {
        description: 'sieve does all the work',
        order: 4,
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.KERNEL ]: MONOCOT_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: MONOCOT_PRESET_SIEVE,
        },
    },
    popcorn: {
        description: 'thanks to Gershon Kingsley',
        order: 0,
        specs: {
            ...initialSpecs,
            [ StandardSpec.BASE_FREQUENCY ]: POPCORN_PRESET_BASE_FREQUENCY,
            [ HafuhafuSpec.KERNEL ]: POPCORN_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: POPCORN_PRESET_SIEVE,
            [ HafuhafuSpec.REVERSED ]: true,
        },
    },
    scaleScramble: {
        description: 'thanks to Gershon Kingsley',
        order: 1,
        specs: {
            ...initialSpecs,
            [ StandardSpec.BASE_FREQUENCY ]: SCALE_SCRAMBLE_PRESET_BASE_FREQUENCY,
            [ StandardSpec.BASE_DURATION ]: SCALE_SCRAMBLE_PRESET_BASE_DURATION,
            [ HafuhafuSpec.KERNEL ]: SCALE_SCRAMBLE_PRESET_KERNEL,
            [ HafuhafuSpec.SIEVE ]: SCALE_SCRAMBLE_PRESET_SIEVE,
            [ HafuhafuSpec.SIEVE_CYCLE_REPETITIONS ]: SCALE_SCRAMBLE_PRESET_SIEVE_CYCLE_REPETITIONS,
            [ HafuhafuSpec.PITCH_STEP ]: SCALE_SCRAMBLE_PRESET_PITCH_STEP,
        },
    },
    threePhaser: {
        description: 'kernel cycles through three versions which are not rotations of each other',
        order: 5,
        specs: {
            ...initialSpecs,
            [ HafuhafuSpec.KERNEL ]: THREE_PHASER_PRESET_KERNEL,
        },
    },
}

export {
    presets,
}
