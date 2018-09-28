// tslint:disable:variable-name no-any

import { Rhythm } from '../types'
import { Cell } from './nominalTypes'

const Cell: (cell: number) => Cell =
    (cell: number): Cell => cell as any

const Rhythm: (_: Array<number | Cell>) => Rhythm =
    (rhythm: Array<number | Cell>): Rhythm =>
        rhythm.map((cell: Cell | number): Cell => cell as any)

export {
    Cell,
    Rhythm,
}
