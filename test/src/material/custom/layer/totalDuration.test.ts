import { Ordinal, Scalar, sum, Time, to } from '@musical-patterns/utilities'
import { computeTotalDuration, HafuhafuMode } from '../../../../../src/indexForTest'

describe('total duration', () => {
    describe('zeno mode', () => {
        it('sums the durations of every element', () => {
            const totalDuration: Scalar<Time> = computeTotalDuration({
                layerCount: to.Cardinal(2),
                mode: HafuhafuMode.ZENO,
                reverse: false,
                sieve: to.Multiple<Ordinal>(2),
                totalIndices: to.Cardinal<Ordinal>(12),
            })

            expect(totalDuration)
                .toBeCloseToTyped(
                    to.Scalar<Time>(sum(
                        1,
                        0.9438743126816934, // Multiple fractal repetition
                        0.8908987181403393, // Kernel repetition
                        0.8408964152537145, // Multiple fractal repetition
                        0.7937005259840998,
                        0.7491535384383408, // Multiple fractal repetition & kernel repetition
                        0.7071067811865476,
                        0.6674199270850172, // Multiple fractal repetition
                        0.6299605249474366, // Kernel repetition
                        0.5946035575013605, // Multiple fractal repetition
                        0.5612310241546865,
                        0.5297315471796477, // Multiple fractal repetition & kernel repetition (6 requested sieve fractal repetitions = done)
                    )),
                )
        })
    })
})
