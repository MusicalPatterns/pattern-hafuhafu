import { Note } from '@musical-patterns/material'
import { HafuhafuSpecs } from '../spec'
import { computeNote } from './features'
import { computeWholes } from './wholes'

const computeNotes: (specs: HafuhafuSpecs) => Note[] =
    (specs: HafuhafuSpecs): Note[] =>
        computeWholes(specs)
            .map(computeNote)

export {
    computeNotes,
}
