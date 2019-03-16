import { apply, Cycle, EVERY_OTHER, from, INITIAL, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { Kernel, to as hafuhafuTo } from '../../nominals'

const computeNextKernel: (kernel: Kernel) => Kernel =
    (kernel: Kernel): Kernel => {
        const nextKernel: Kernel = hafuhafuTo.Kernel([])
        const kernelAsCycle: Cycle = to.Cycle(kernel)
        for (let index: Ordinal = INITIAL; index < to.Ordinal(kernel.length); index = apply.Translation(index, NEXT)) {
            const nextEveryOtherIndex: Ordinal = apply.Scalar(index, to.Scalar(from.Cardinal(EVERY_OTHER)))
            const nextEveryOtherElement: number = apply.Ordinal(kernelAsCycle, nextEveryOtherIndex)
            nextKernel.push(nextEveryOtherElement)
        }

        return nextKernel
    }

export {
    computeNextKernel,
}
