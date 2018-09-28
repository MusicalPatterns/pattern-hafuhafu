import { Cell } from './utilities/nominalTypes'

type Rhythm = Cell[]

type Rhythms = Rhythm[]

enum Direction {
    IN = 'in',
    OUT = 'out',
}

export {
    Rhythm,
    Rhythms,
    Direction,
}
