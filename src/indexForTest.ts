// tslint:disable no-reaching-imports

export {
    computeNextKernel,
    computeNote,
    materializeEntities,
    materializeScales,
    computeKernelCycle,
    computeScalars,
    computeKernelIteration,
    computeKernelIterationIndexProgress,
    computeKernelIterationElementDuration,
    computeKernelIterationElementSustain,
    computeKernelIterationElementPitch,
    computeKernelIterationTotalIndices,
    computeKernelIterations,
    computeKernelIterationElementGain,
    computeRandomDropGain,
    computeKernelIterationDurationProgress,
    computeKernelIterationTotalDuration,
} from './material/indexForTest'
export {
    initialSpecs,
    DeletionStyle,
    HafuhafuSpec,
    HafuhafuSpecs,
    computeValidations,
} from './spec/indexForTest'
export { pattern } from './patterns'
export { to, Kernel, Sieve } from './nominals'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
