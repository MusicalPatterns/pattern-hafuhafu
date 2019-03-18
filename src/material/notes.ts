import { Note } from '@musical-patterns/compiler'
import { Cycle } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import { computeNote } from './features'
import { computeKernelIterations } from './wholes'

const computeNotes: (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs) => Note[] =
    (kernelCycle: Cycle<Kernel>, specs: HafuhafuSpecs): Note[] =>
        computeKernelIterations(kernelCycle, specs)
            .map(computeNote)

export {
    computeNotes,
}
