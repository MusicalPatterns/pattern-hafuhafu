import { Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { Kernel, Sieve } from '../../../nominals'
import { computeNextKernel } from './nextKernel'

const computeKernelCycle: (kernel: Kernel, sieve: Sieve) => Cycle<Kernel> =
    (kernel: Kernel, sieve: Sieve): Cycle<Kernel> => {
        const kernelCycle: Cycle<Kernel> = to.Cycle([ deepClone(kernel) ])

        let nextKernel: Kernel = computeNextKernel(kernel, sieve)
        while (!deepEqual(kernel, nextKernel)) {
            kernelCycle.push(deepClone(nextKernel))
            nextKernel = computeNextKernel(nextKernel, sieve)
        }

        return kernelCycle
    }

export {
    computeKernelCycle,
}
