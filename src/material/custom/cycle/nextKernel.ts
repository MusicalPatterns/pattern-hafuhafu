import {
    apply,
    arraySet,
    Block,
    Cardinal,
    Cycle, DECREMENT,
    from,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    Multiple,
    negative,
    NEXT,
    Ordinal,
    PREVIOUS,
    slice,
    to,
    totalElements, ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { ComputeNextKernelParameters } from './types'

const computeNextKernel: (parameters: {
    previousKernel: Block,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal,
}) => Block =
    ({ totalIndices, previousKernel, reverse, sieve }: ComputeNextKernelParameters): Block => {
        const kernelLength: Cardinal = totalElements(previousKernel)

        if (reverse) {
            const nextKernel: Block = to.Block([])
            const terminalKernel: Cycle = apply.Translation(
                to.Cycle(previousKernel),
                to.Translation<Cycle>(from.Cardinal(negative(totalIndices))),
            )

            for (
                let terminalKernelIndex: Ordinal = INITIAL;
                terminalKernelIndex < indexJustBeyondFinalElementFromElementsTotal(kernelLength);
                terminalKernelIndex = apply.Translation(terminalKernelIndex, NEXT)
            ) {
                const nextKernelIndex: Ordinal = apply.Modulus(
                    apply.Translation(
                        apply.Multiple(terminalKernelIndex, sieve),
                        to.Translation<Ordinal>(from.Multiple(apply.Translation(sieve, DECREMENT))),
                    ),
                    to.Modulus<Ordinal>(from.Cardinal(kernelLength)),
                )

                arraySet(nextKernel, nextKernelIndex, apply.Ordinal(terminalKernel, terminalKernelIndex))
            }

            return nextKernel
        }

        return to.Block(
            slice(
                ZERO_AND_POSITIVE_INTEGERS,
                INITIAL,
                indexJustBeyondFinalElementFromElementsTotal(kernelLength),
            )
                .map(to.Ordinal)
                .map((index: Ordinal) => {
                    const nextIndex: Ordinal = apply.Translation(
                        apply.Scalar(index, to.Scalar(from.Multiple<Ordinal>(sieve))),
                        to.Translation<Ordinal>(from.Cardinal(totalIndices)),
                    )

                    return apply.Ordinal(to.Cycle(previousKernel), nextIndex)
                }),
        )
    }

export {
    computeNextKernel,
}
