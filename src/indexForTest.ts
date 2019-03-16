// tslint:disable no-reaching-imports

export {
    computeNextKernel,
    computeNote,
    materializeEntities,
    materializeScales,
    computeKernelCycle,
    computeScalars,
    computePiece,
} from './material/indexForTest'
export {
    initialSpecs,
    DeletionStyle,
    HafuhafuSpecs,
    computeValidations,
} from './spec/indexForTest'
export { pattern } from './patterns'
export { to, Kernel } from './nominals'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
