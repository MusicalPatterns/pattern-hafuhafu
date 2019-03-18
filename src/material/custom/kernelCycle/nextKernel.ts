import { apply, Cycle, INITIAL, NEXT, Ordinal, to } from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Kernel, Sieve, to as hafuhafuTo } from '../../../nominals'

const computeNextKernel: (previousKernel: Kernel, sieve: Sieve) => Kernel =
    (previousKernel: Kernel, sieve: Sieve): Kernel => {
        const nextKernel: Kernel = hafuhafuTo.Kernel([])
        const previousKernelAsCycle: Cycle = to.Cycle(previousKernel)
        for (
            let index: Ordinal = INITIAL;
            index < to.Ordinal(previousKernel.length);
            index = apply.Translation(index, NEXT)
        ) {
            const nextIndex: Ordinal = apply.Scalar(index, to.Scalar(hafuhafuFrom.Sieve(sieve)))
            const nextElement: number = apply.Ordinal(previousKernelAsCycle, nextIndex)
            nextKernel.push(nextElement)
        }

        return nextKernel
    }

export {
    computeNextKernel,
}
