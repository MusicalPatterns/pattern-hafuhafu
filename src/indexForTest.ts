// tslint:disable no-reaching-imports

export {
    computeNextBlock,
    computeNote,
    materializeEntities,
    materializeScales,
    computeCycle,
    computeScalars,
    computePiece,
} from './material/indexForTest'
export {
    initial,
    DeletionStyle,
    HafuhafuSpec,
} from './spec/indexForTest'
export { pattern } from './patterns'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
