import { apply } from '@musical-patterns/shared'
import { PatternId } from '../../patternId'
import { Pattern, PatternMaterial, PatternMetadata } from '../../types'
import {
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_INITIAL_ITERATION_LENGTH,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { buildEntities, buildHafuhafuWithPitchCircularityEntities, buildScales } from './materials'
import { HafuhafuPatternSpec } from './types'

const hafuhafuPatternMaterial: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const hafuhafuWithPitchCircularityPatternMaterial: PatternMaterial = {
    buildEntitiesFunction: buildHafuhafuWithPitchCircularityEntities,
    buildScalesFunction: buildScales,
}

const hafuhafuPatternMetadata: PatternMetadata = {
    description: 'fading out subsets of notes corresponding to increasing tempo to evolve the result through itself',
    formattedName: 'Hafuhafu',
    musicalIdeaIllustrated: 'rhythmic circularity',
}

const hafuhafuWithPitchCircularityPatternMetadata: PatternMetadata = {
    description: 'same as above, just with extraneous and slipshod pitch circularity',
    formattedName: 'Hafuhafu (with pitch circularity)',
    musicalIdeaIllustrated: 'rhythmic circularity',
}

const patternSpec: HafuhafuPatternSpec = {
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
    patternDurationScalar: HAFUHAFU_DURATION_SCALAR,
    patternPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const hafuhafuWithPitchCircularityPatternSpec: HafuhafuPatternSpec = {
    block: HAFUHAFU_INITIAL_BLOCK,
    iterationLength: HAFUHAFU_INITIAL_ITERATION_LENGTH,
    patternDurationScalar: apply.Scalar(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    patternPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const pattern: Pattern = {
    material: hafuhafuPatternMaterial,
    metadata: hafuhafuPatternMetadata,
    patternId: PatternId.HAFUHAFU,
    spec: patternSpec,
}

const hafuhafuWithPitchCircularityPattern: Pattern = {
    material: hafuhafuWithPitchCircularityPatternMaterial,
    metadata: hafuhafuWithPitchCircularityPatternMetadata,
    patternId: PatternId.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    spec: hafuhafuWithPitchCircularityPatternSpec,
}

export {
    pattern,
    hafuhafuWithPitchCircularityPattern,
}
