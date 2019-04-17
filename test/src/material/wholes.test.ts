import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import { ContourWhole, to, totalElements } from '@musical-patterns/utilities'
import { computeWholes, HafuhafuSpecs, initialSpecs, to as hafuhafuTo } from '../../../src/indexForTest'

describe('wholes', () => {
    it(
        `should return an array with length equal to the kernel cycle length times the iteration length, \
which in turn is the sieve fractal length times the sieve fractal repetitions, \
where the sieve fractal cycle length is the sieve^(layerCount - 1)`,
        () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                layerCount: to.Cardinal(2),
                sieve: to.Multiple(3),
                sieveFractalRepetitions: to.Cardinal(7),
            }

            const wholes: ContourWhole<PitchDurationGainSustainScale> = computeWholes(specs)

            expect(totalElements(wholes))
            // tslint:disable-next-line binary-expression-operand-order
                .toBe(to.Cardinal(4 * Math.pow(3, 1) * 7))
        },
    )
})
