import { PatternMaterial } from '@musical-patterns/compiler'
import { PatternMetadata } from '@musical-patterns/pattern'
import { buildPatterns, Pattern, PatternId, Patterns } from '@musical-patterns/registry'
import { buildEntities, buildHafuhafuWithPitchCircularityEntities, buildScales } from './materials'
import { post } from './metadata'
import { hafuhafuWithPitchCircularityPatternSpec, initialSpec, specAttributes } from './specs'

const material: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const hafuhafuWithPitchCircularityPatternMaterial: PatternMaterial = {
    buildEntitiesFunction: buildHafuhafuWithPitchCircularityEntities,
    buildScalesFunction: buildScales,
}

const metadata: PatternMetadata = {
    description: post,
    formattedName: 'Hafuhafu',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-27T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-27T07:00:00.000Z',
}

const hafuhafuWithPitchCircularityPatternMetadata: PatternMetadata = {
    description: 'same as above, just with extraneous and slipshod pitch circularity',
    formattedName: 'Hafuhafu (with pitch circularity)',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-28T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-28T07:00:00.000Z',
}

const pattern: Pattern = {
    initialSpec,
    material,
    metadata,
    patternId: PatternId.HAFUHAFU,
    specAttributes,
}

const hafuhafuWithPitchCircularityPattern: Pattern = {
    initialSpec: hafuhafuWithPitchCircularityPatternSpec,
    material: hafuhafuWithPitchCircularityPatternMaterial,
    metadata: hafuhafuWithPitchCircularityPatternMetadata,
    patternId: PatternId.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    specAttributes,
}

const patterns: Patterns = buildPatterns({
    [ pattern.patternId ]: pattern,
    [ PatternId.HAFUHAFU_WITH_PITCH_CIRCULARITY ]: hafuhafuWithPitchCircularityPattern,
})

export {
    pattern,
    hafuhafuWithPitchCircularityPattern,
    patterns,
}
