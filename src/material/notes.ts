import { Note } from '@musical-patterns/compiler'
import { Block, Cycle } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { buildNote } from './features'
import { buildWhole } from './wholes'

const buildNotes: (cycle: Cycle<Block>, spec: HafuhafuSpec) => Note[] =
    (cycle: Cycle<Block>, spec: HafuhafuSpec): Note[] =>
        buildWhole(cycle, spec)
            .map(buildNote)

export {
    buildNotes,
}
