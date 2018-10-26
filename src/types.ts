import { BaseSongSpec, Scalar } from '../../../src'
import { Cell } from './nominal'

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

interface HafuhafuSongSpec extends BaseSongSpec {
    rhythm: Rhythm,
}

export {
    Rhythm,
    Rhythms,
    Direction,
    BuildHafuhafuNoteSpecParameters,
    HafuhafuSongSpec,
}
