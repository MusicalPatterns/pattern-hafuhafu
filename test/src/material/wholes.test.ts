import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import { Cardinal, ContourElement, ContourWhole, length, Ordinal, to } from '@musical-patterns/utilities'
import { computeWholes, HafuhafuSpecs, initialSpecs } from '../../../src/indexForTest'

describe('wholes', () => {
    it(
        `should return an array with length equal to the kernel cycle length times the iteration length, \
which in turn is the sieve fractal length times the sieve fractal repetitions, \
where the sieve fractal cycle length is the sieve^(layerCount - 1)`,
        () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                layerCount: to.Cardinal(2),
                sieve: to.Multiple<Ordinal>(3),
                sieveFractalRepetitions: to.Multiple<Cardinal<Ordinal>>(7),
            }

            const wholes: ContourWhole<PitchDurationGainSustainScale> = computeWholes(specs)

            expect(length(wholes))
            // tslint:disable-next-line binary-expression-operand-order
                .toBe(to.Cardinal<ContourElement<PitchDurationGainSustainScale>>(4 * Math.pow(3, 1) * 7))
        },
    )
})
