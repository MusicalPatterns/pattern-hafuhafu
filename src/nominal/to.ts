// tslint:disable:variable-name no-any

import { Rhythm, Rhythms } from '../types'
import { Cell } from './types'

const Cell: (cell: number) => Cell =
    (cell: number): Cell => cell as any

const Rhythm: (rhythm: Array<number | Cell>) => Rhythm =
    (rhythm: Array<number | Cell>): Rhythm =>
        rhythm.map((cell: Cell | number): Cell => cell as any)

const Rhythms: (rhythms: Array<Rhythm | number[]>) => Rhythms =
    (rhythms: Array<Rhythm | number[]>): Rhythms =>
        rhythms.map((rhythm: Rhythm | number[]): Rhythm => rhythm as any)

export {
    Cell,
    Rhythm,
    Rhythms,
}
