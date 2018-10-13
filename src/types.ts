import { Config } from '../../../src/songTypes'
import { Cell } from './utilities/nominalTypes'

type Rhythm = Cell[]

type Rhythms = Rhythm[]

enum Direction {
    IN = 'in',
    OUT = 'out',
}

interface HafuhafuConfig extends Config {
    rhythm: Rhythm,
}

export {
    Rhythm,
    Rhythms,
    Direction,
    HafuhafuConfig,
}
