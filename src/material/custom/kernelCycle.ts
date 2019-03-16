import { Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { Kernel } from '../../nominals'
import { computeNextKernel } from './nextKernel'

const computeKernelCycle: (sourceKernel: Kernel) => Cycle<Kernel> =
    (sourceKernel: Kernel): Cycle<Kernel> => {
        const kernelCycle: Cycle<Kernel> = to.Cycle([ deepClone(sourceKernel) ])

        let nextKernel: Kernel = computeNextKernel(sourceKernel)
        while (!deepEqual(sourceKernel, nextKernel)) {
            kernelCycle.push(deepClone(nextKernel))
            nextKernel = computeNextKernel(nextKernel)
        }

        return kernelCycle
    }

export {
    computeKernelCycle,
}
