import { HafuhafuPreset, HafuhafuSpec } from './types'

const specsOrder: HafuhafuSpec[] = [
    HafuhafuSpec.MODE,
    HafuhafuSpec.SOURCE_KERNEL,
    HafuhafuSpec.SIEVE,
    HafuhafuSpec.LAYER_COUNT,
    HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS,
    HafuhafuSpec.EXISTENCE_STYLE,
    HafuhafuSpec.STRETCH_PITCH,
    HafuhafuSpec.REVERSE,
    HafuhafuSpec.PITCH_STEP,
]

const presetsOrder: HafuhafuPreset[] = [
    HafuhafuPreset.THREE_PHASER,
    HafuhafuPreset.SCALE_SCRAMBLE,
    HafuhafuPreset.POPCORN,
    HafuhafuPreset.MONOCOT,
    HafuhafuPreset.AASB_KERNELWISE,
    HafuhafuPreset.AASB_SIEVEWISE,
    HafuhafuPreset.CHORTLES,
    HafuhafuPreset.CATERPILLAR,
    HafuhafuPreset.SHOW_TEXTURE,
    HafuhafuPreset.RECURSIEVE,
    HafuhafuPreset.SIEVELIZATION_III,
]

export {
    presetsOrder,
    specsOrder,
}
