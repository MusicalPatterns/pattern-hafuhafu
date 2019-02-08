// tslint:disable no-reaching-imports

export {
    buildNextBlock,
    buildNoteSpec,
    buildEntities,
    buildScales,
    buildCycle,
    buildScalars,
    buildPiece,
} from './material/indexForTest'
export {
    initial,
} from './spec/indexForTest'
export { pattern } from './patterns'

export {
    DeletionStyle,
    HafuhafuSpec,
} from './types'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
