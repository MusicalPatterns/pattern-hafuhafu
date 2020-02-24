import { STANDARD_PITCH_INDEX_INDICATING_REST } from '@musical-patterns/material'
import { InputType, RangedInputType, standardConfigurations } from '@musical-patterns/spec'
import { as } from '@musical-patterns/utilities'
import { optionedConstraints, rangedConstraints } from './constraints'
import { specsOrder } from './orders'
import { HafuhafuConfigurations, HafuhafuSpec } from './types'

const configurations: HafuhafuConfigurations = {
    ...standardConfigurations,
    [ HafuhafuSpec.EXISTENCE_STYLE ]: {
        constraint: optionedConstraints[ HafuhafuSpec.EXISTENCE_STYLE ],
        inputType: InputType.OPTIONED,
        order: specsOrder.indexOf(HafuhafuSpec.EXISTENCE_STYLE),
    },
    [ HafuhafuSpec.MODE ]: {
        constraint: optionedConstraints[ HafuhafuSpec.MODE ],
        inputType: InputType.OPTIONED,
        order: specsOrder.indexOf(HafuhafuSpec.MODE),
    },
    [ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ]: {
        constraint: rangedConstraints[ HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS ],
        description: `over the course of each iteration, each layer gradually transforms so that it seamlessly seems \
to become the layer one index off in the next iteration; for layers to accomplish this, the iterations must be in \
multiples of sieves, though that number of repetitions is arbitrary, simply determining how long it takes for an \
iteration to complete`,
        formattedName: 'Multiple Repetitions',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.SIEVE_FRACTAL_REPETITIONS),
    },
    [ HafuhafuSpec.SOURCE_KERNEL ]: {
        arrayedConstraint: {
            minLength: 1,
            required: true,
        },
        arrayedNewFieldInitialValue: as.number(STANDARD_PITCH_INDEX_INDICATING_REST),
        constraint: rangedConstraints[ HafuhafuSpec.SOURCE_KERNEL ],
        description: 'a pattern of pitches to cycle (use -1 for a rest)',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        isArrayed: true,
        order: specsOrder.indexOf(HafuhafuSpec.SOURCE_KERNEL),
    },
    [ HafuhafuSpec.PITCH_STEP ]: {
        constraint: {
            required: true,
        },
        description: 'the pitch resolution you write your melody in',
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.PITCH_STEP),
    },
    [ HafuhafuSpec.REVERSE ]: {
        description: 'the pattern infinitely slows down instead of infinitely speeding up',
        inputType: InputType.TOGGLED,
        order: specsOrder.indexOf(HafuhafuSpec.REVERSE),
    },
    [ HafuhafuSpec.SIEVE ]: {
        constraint: rangedConstraints[ HafuhafuSpec.SIEVE ],
        description: 'span many notes to drop as you transform from one kernel into the next',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.SIEVE),
    },
    [ HafuhafuSpec.LAYER_COUNT ]: {
        constraint: rangedConstraints[ HafuhafuSpec.LAYER_COUNT ],
        description: `how many layers of speeds / intensities / pitches to have present simultaneously; \
essentially fractalizes the sieve`,
        formattedName: 'Layers',
        hideInput: RangedInputType.RANGE,
        inputType: InputType.RANGED,
        order: specsOrder.indexOf(HafuhafuSpec.LAYER_COUNT),
    },
    [ HafuhafuSpec.STRETCH_PITCH ]: {
        description: 'whether or not a pitch stretch proportional to value is applied, differentiating layers',
        inputType: InputType.TOGGLED,
        order: specsOrder.indexOf(HafuhafuSpec.STRETCH_PITCH),
    },
}

export {
    configurations,
}
