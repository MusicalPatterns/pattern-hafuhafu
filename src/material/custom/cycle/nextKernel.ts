import {
    apply,
    arraySet,
    Block,
    Cardinal,
    Cycle,
    from,
    INITIAL,
    negative,
    NEXT,
    Ordinal,
    PREVIOUS,
    slice,
    to,
    totalElements,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { from as hafuhafuFrom, Sieve } from '../../../nominals'
import { ComputeNextKernelParameters } from './types'

const computeNextKernel: (parameters: {
    previousKernel: Block,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal,
}) => Block =
    ({ totalIndices, previousKernel, reverse, sieve }: ComputeNextKernelParameters): Block => {
        const kernelLength: Cardinal = totalElements(previousKernel)

        if (reverse) {
            const nextKernel: Block = to.Block([])
            const terminalKernel: Cycle = apply.Translation(
                to.Cycle(previousKernel),
                to.Translation(from.Cardinal(negative(totalIndices))),
            )

            for (
                let terminalKernelIndex: Ordinal = INITIAL;
                terminalKernelIndex < kernelLength;
                terminalKernelIndex = apply.Translation(terminalKernelIndex, NEXT)
            ) {
                const nextKernelIndex: Ordinal = apply.Modulus(
                    apply.Translation(
                        apply.Scalar(terminalKernelIndex, to.Scalar(hafuhafuFrom.Sieve(sieve))),
                        to.Translation(hafuhafuFrom.Sieve(apply.Translation(sieve, PREVIOUS))),
                    ),
                    kernelLength,
                )

                arraySet(nextKernel, nextKernelIndex, apply.Ordinal(terminalKernel, terminalKernelIndex))
            }

            return nextKernel
        }

        return to.Block(slice(zeroAndPositiveIntegers, INITIAL, kernelLength)
            .map(to.Ordinal)
            .map((index: Ordinal) => {
                const nextIndex: Ordinal = apply.Translation(
                    apply.Scalar(index, to.Scalar(hafuhafuFrom.Sieve(sieve))),
                    to.Translation(from.Cardinal(totalIndices)),
                )

                return apply.Ordinal(to.Cycle(previousKernel), nextIndex)
            }))
    }

export {
    computeNextKernel,
}
