import { PitchDurationGainSustain } from '@musical-patterns/pattern'
import { ContourWhole, Cycle, to, totalElements } from '@musical-patterns/utilities'
import {
    computeKernelIterations,
    HafuhafuSpecs,
    initialSpecs,
    Kernel,
    to as hafuhafuTo,
} from '../../../src/indexForTest'

describe('kernel iterations', () => {
    it(
        `should return an array with length equal to the kernel cycle length times the kernel iteration length \
        which in turn is the kernel length times the sieve times the sieve cycle repetitions`,
        () => {
            const kernelCycle: Cycle<Kernel> = to.Cycle([
                [ 0, 0, 1, 0, 1 ],
                [ 0, 1, 1, 0, 0 ],
                [ 0, 1, 0, 1, 0 ],
                [ 0, 0, 0, 1, 1 ],
            ].map(hafuhafuTo.Kernel))
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                sieve: hafuhafuTo.Sieve(3),
                sieveCycleRepetitions: to.Cardinal(7),
            }

            const actualKernelIterations: ContourWhole<PitchDurationGainSustain> =
                computeKernelIterations(kernelCycle, specs)

            expect(totalElements(actualKernelIterations))
            // tslint:disable-next-line binary-expression-operand-order
                .toBe(to.Cardinal(4 * (5 * 3 * 7)))
        },
    )
})
