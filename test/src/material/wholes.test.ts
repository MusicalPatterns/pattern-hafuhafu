import { PitchValueIntensityEnvelopeScale } from '@musical-patterns/material'
import { as, Cardinal, computeLength, ContourWhole } from '@musical-patterns/utilities'
import { computeWholes, HafuhafuSpecs, initialSpecs, Layer, LayerIndex } from '../../../src/indexForTest'

describe('wholes', () => {
    it(
        `should return an array with length equal to the kernel cycle length times the iteration length, \
which in turn is the sieve fractal length times the sieve fractal repetitions, \
where the sieve fractal cycle length is the sieve^(layerCount - 1)`,
        () => {
            const specs: HafuhafuSpecs = {
                ...initialSpecs,
                layerCount: as.Cardinal<Layer[]>(2),
                sieve: as.Multiple<LayerIndex>(3),
                sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(7),
            }

            const wholes: ContourWhole<PitchValueIntensityEnvelopeScale> = computeWholes(specs)

            expect(computeLength(wholes))
            // tslint:disable-next-line binary-expression-operand-order
                .toBe(as.Cardinal<ContourWhole<PitchValueIntensityEnvelopeScale>>(4 * Math.pow(3, 1) * 7))
        },
    )
})
