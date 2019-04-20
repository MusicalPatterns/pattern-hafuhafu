import {
    arraySet,
    as,
    Block,
    Cardinal,
    Cycle,
    DECREMENT,
    indexJustBeyondFinalElementFromElementsTotal,
    INITIAL,
    length,
    Multiple,
    negative,
    NEXT,
    notAs,
    Ordinal,
    slice,
    use,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { ComputeNextKernelParameters } from './types'

const computeNextKernel: (parameters: {
    previousKernel: Block,
    reverse: boolean,
    sieve: Multiple<Ordinal>,
    totalIndices: Cardinal<Ordinal>,
}) => Block =
    ({ totalIndices, previousKernel, reverse, sieve }: ComputeNextKernelParameters): Block => {
        const kernelLength: Cardinal = length(previousKernel)

        if (reverse) {
            const nextKernel: Block = as.Block([])
            const terminalKernel: Cycle = use.Translation(
                as.Cycle(previousKernel),
                as.Translation<Cycle>(notAs.Cardinal<Ordinal>(negative(totalIndices))),
            )

            for (
                let terminalKernelIndex: Ordinal = INITIAL;
                terminalKernelIndex < indexJustBeyondFinalElementFromElementsTotal(kernelLength);
                terminalKernelIndex = use.Translation(terminalKernelIndex, NEXT)
            ) {
                const nextKernelIndex: Ordinal = use.IntegerModulus(
                    use.Translation(
                        use.Multiple(terminalKernelIndex, sieve),
                        as.Translation<Ordinal>(notAs.Multiple(use.Translation(sieve, DECREMENT))),
                    ),
                    as.IntegerModulus<Ordinal>(notAs.Cardinal(kernelLength)),
                )

                arraySet(nextKernel, nextKernelIndex, use.Ordinal(terminalKernel, terminalKernelIndex))
            }

            return nextKernel
        }

        return as.Block(
            slice(
                ZERO_AND_POSITIVE_INTEGERS,
                INITIAL,
                indexJustBeyondFinalElementFromElementsTotal(kernelLength),
            )
                .map(as.Ordinal)
                .map((index: Ordinal) => {
                    const nextIndex: Ordinal = use.Translation(
                        use.Multiple(index, sieve),
                        as.Translation<Ordinal>(notAs.Cardinal(totalIndices)),
                    )

                    return use.Ordinal(as.Cycle(previousKernel), nextIndex)
                }),
        )
    }

export {
    computeNextKernel,
}
