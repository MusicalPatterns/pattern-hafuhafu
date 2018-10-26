// tslint:disable:variable-name no-any

import { Cell } from './types'

const Cell: (cell: Cell) => number =
    (cell: Cell): number => cell as any

export {
    Cell,
}
