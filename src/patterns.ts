import { Material } from '@musical-patterns/compiler'
import { buildPatterns, Id, Metadata, PatternFor, Patterns } from '@musical-patterns/pattern'
import { buildEntities, buildHafuhafuWithPitchCircularityEntities, buildScales } from './materials'
import { post } from './metadata'
import { hafuhafuWithPitchCircularitySpecData, specData } from './specs'
import { HafuhafuSpec } from './types'

const material: Material = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const hafuhafuWithPitchCircularityPatternMaterial: Material = {
    buildEntitiesFunction: buildHafuhafuWithPitchCircularityEntities,
    buildScalesFunction: buildScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Hafuhafu',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-27T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-27T07:00:00.000Z',
}

const hafuhafuWithPitchCircularityPatternMetadata: Metadata = {
    description: 'same as above, just with extraneous and slipshod pitch circularity',
    formattedName: 'Hafuhafu (with pitch circularity)',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-28T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-28T07:00:00.000Z',
}

const pattern: PatternFor<HafuhafuSpec> = {
    id: Id.HAFUHAFU,
    material,
    metadata,
    specData,
}

const hafuhafuWithPitchCircularityPattern: PatternFor<HafuhafuSpec> = {
    id: Id.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    material: hafuhafuWithPitchCircularityPatternMaterial,
    metadata: hafuhafuWithPitchCircularityPatternMetadata,
    specData: hafuhafuWithPitchCircularitySpecData,
}

const patterns: Patterns = buildPatterns({
    [ pattern.id ]: pattern,
    [ hafuhafuWithPitchCircularityPattern.id ]: hafuhafuWithPitchCircularityPattern,
})

export {
    pattern,
    hafuhafuWithPitchCircularityPattern,
    patterns,
}
