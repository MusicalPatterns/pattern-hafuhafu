import { Material } from '@musical-patterns/compiler'
import { Id, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { buildEntities, buildScales } from './material'
import { post } from './metadata'
import { data, HafuhafuSpec } from './spec'

const material: Material = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Hafuhafu',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-27T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-27T07:00:00.000Z',
    version: process.env.PATTERN_VERSION || 'unknown',
}

const pattern: Pattern<HafuhafuSpec> = {
    data,
    id: Id.HAFUHAFU,
    material,
    metadata,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
