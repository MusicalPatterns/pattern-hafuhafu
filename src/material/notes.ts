import { Note } from '@musical-patterns/compiler'
import { Block, Cycle } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeNote } from './features'
import { computeWhole } from './wholes'

const computeNotes: (cycle: Cycle<Block>, specs: HafuhafuSpecs) => Note[] =
    (cycle: Cycle<Block>, specs: HafuhafuSpecs): Note[] =>
        computeWhole(cycle, specs)
            .map(computeNote)

export {
    computeNotes,
}
