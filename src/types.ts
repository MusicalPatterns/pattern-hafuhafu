import { Scalar } from '../../../src'
import { SongSpec } from '../../types'
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

interface HafuhafuSongSpec extends SongSpec {
    rhythm: Rhythm,
}

export {
    Rhythm,
    Rhythms,
    Direction,
    BuildHafuhafuNoteSpecParameters,
    HafuhafuSongSpec,
}
