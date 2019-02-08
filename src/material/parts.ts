import { NoteSpec } from '@musical-patterns/compiler'
import { Block, Cycle } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'
import { buildNoteSpec } from './notes'
import { buildWhole } from './wholes'

const buildPart: (cycle: Cycle<Block>, spec: HafuhafuSpec) => NoteSpec[] =
    (cycle: Cycle<Block>, spec: HafuhafuSpec): NoteSpec[] =>
        buildWhole(cycle, spec)
            .map(buildNoteSpec)

export {
    buildPart,
}
