// tslint:disable:variable-name no-any

import { Cell } from './nominalTypes'

const Cell: (cell: Cell) => number =
    (cell: Cell): number => cell as any

export {
    Cell,
}
