import { Scalar } from '../../../src/utilities/nominalTypes'
import { Cell } from './utilities/nominalTypes'

type Rhythm = Cell[]

type Rhythms = Rhythm[]

enum Direction {
    IN = 'in',
    OUT = 'out',
}

interface BuildHafuhafuNoteSpecParameters {
    cell: Cell,
    duration: Scalar,
    gain: Scalar,
    pitch: Scalar,
    sustain: Scalar,
}

export {
    Rhythm,
    Rhythms,
    Direction,
    BuildHafuhafuNoteSpecParameters,
}
