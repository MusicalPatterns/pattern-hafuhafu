import { Entity, MaterializeEntities, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { Cycle } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import { computeKernelCycle } from './custom'
import { computeNotes } from './notes'

const materializeEntities: MaterializeEntities =
    (specs: HafuhafuSpecs): Entity[] => {
        const kernelCycle: Cycle<Kernel> = computeKernelCycle(specs.kernel, specs.sieve)
        const notes: Note[] = computeNotes(kernelCycle, specs)

        return [
            {
                notes,
                timbreName: TimbreNameEnum.WURLITZER,
            },
        ]
    }

export {
    materializeEntities,
}
