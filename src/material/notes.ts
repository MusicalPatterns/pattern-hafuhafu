import { Note } from '@musical-patterns/compiler'
import { Block, Cycle } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { computeNote } from './features'
import { computeWhole } from './wholes'

const computeNotes: (cycle: Cycle<Block>, spec: HafuhafuSpec) => Note[] =
    (cycle: Cycle<Block>, spec: HafuhafuSpec): Note[] =>
        computeWhole(cycle, spec)
            .map(computeNote)

export {
    computeNotes,
}
