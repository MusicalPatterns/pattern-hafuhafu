import { Id, Pattern, Patterns } from '@musical-patterns/pattern'
import { material } from './material'
import { metadata } from './metadata'
import { HafuhafuSpecs, spec } from './spec'

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
