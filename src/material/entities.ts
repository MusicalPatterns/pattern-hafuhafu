import { Entity, MaterializeEntities, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { Cycle } from '@musical-patterns/utilities'
import { Kernel } from '../nominals'
import { HafuhafuSpecs } from '../spec'
import { computeKernelCycle } from './custom'
import { computeNotes } from './notes'

const materializeEntities: MaterializeEntities =
    (specs: HafuhafuSpecs): Entity[] => {
        const sourceKernel: Kernel = specs.kernel

        const kernelCycle: Cycle<Kernel> = computeKernelCycle(sourceKernel)
        const notes: Note[] = computeNotes(kernelCycle, specs)

        const entity: Entity = {
            notes,
            timbreName: TimbreNameEnum.WURLITZER,
        }

        return [
            entity,
        ]
    }

export {
    materializeEntities,
}
