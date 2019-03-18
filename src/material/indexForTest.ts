// tslint:disable no-reaching-imports

export { computeNote } from './features'
export { materializeEntities } from './entities'
export { materializeScales } from './scales'
export { computeScalars } from './scalars'
export { computeKernelIteration } from './pieces'
export { computeKernelIterations } from './wholes'

export {
    computeKernelCycle,
    computeNextKernel,
    computeKernelIterationIndexProgress,
    computeKernelIterationElementDuration,
    computeKernelIterationElementSustain,
    computeKernelIterationElementPitch,
    computeKernelIterationTotalIndices,
    computeKernelIterationElementGain,
    computeRandomDropGain,
    computeKernelIterationDurationProgress,
    computeKernelIterationTotalDuration,
} from './custom/indexForTest'
