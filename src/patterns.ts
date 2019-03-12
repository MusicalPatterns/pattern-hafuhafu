import { Material } from '@musical-patterns/compiler'
import { Id, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { materializeEntities, materializeScales } from './material'
import { post } from './metadata'
import { HafuhafuSpecs, spec } from './spec'

const material: Material = {
    materializeEntities,
    materializeScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Hafuhafu',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-09-27T07:00:00.000Z',
    musicalIdeaIllustrated: 'rhythmic circularity',
    originalPublish: '2018-09-27T07:00:00.000Z',
    version: process.env.PATTERN_VERSION || 'unknown',
}

const pattern: Pattern<HafuhafuSpecs> = {
    id: Id.HAFUHAFU,
    material,
    metadata,
    spec,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
