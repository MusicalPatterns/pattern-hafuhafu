import { Cardinal, Ordinal } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'

interface ComputeContourElementParameters {
    cellCount: Cardinal,
    cycleKernel: Kernel,
    pieceIndex: Ordinal,
    specs: HafuhafuSpecs,
}

export {
    ComputeContourElementParameters,
}
