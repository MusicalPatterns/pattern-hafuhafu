import {
    arraySet,
    as,
    Block,
    Cardinal,
    Cycle,
    DECREMENT,
    insteadOf,
    length,
    Multiple,
    negative,
    Ordinal,
    range,
    use,
} from '@musical-patterns/utilities'
import { LayerIndex, Sieve } from '../../../types'
import { ComputeNextKernelParameters } from './types'

const computeNextKernel: (parameters: {
    previousKernel: Block,
    reverse: boolean,
    sieve: Sieve,
    totalIndices: Cardinal<LayerIndex[]>,
}) => Block =
    ({ totalIndices, previousKernel, reverse, sieve }: ComputeNextKernelParameters): Block => {
        const kernelLength: Cardinal<Block> = length(previousKernel)

        if (reverse) {
            const nextKernel: Block = as.Block([])
            const terminalKernel: Cycle = use.Cardinal(
                as.Cycle(previousKernel),
                insteadOf<Cardinal, Cycle>(negative(totalIndices)),
            )

            range(kernelLength)
                .map(as.Ordinal)
                .forEach((terminalKernelIndex: Ordinal) => {
                    const nextKernelIndex: Ordinal = use.Remaindee(
                        use.Transition(
                            use.Multiple(terminalKernelIndex, insteadOf<Multiple, Ordinal>(sieve)),
                            as.Transition(as.number(use.Cardinal(sieve, DECREMENT))),
                        ),
                        as.Remaindee<Ordinal>(as.number(kernelLength)),
                    )

                    arraySet(nextKernel, nextKernelIndex, use.Ordinal(terminalKernel, terminalKernelIndex))
                })

            return nextKernel
        }

        return as.Block(
            range(kernelLength)
                .map(as.Ordinal)
                .map((index: Ordinal) => {
                    const nextIndex: Ordinal = use.Transition(
                        use.Multiple(index, insteadOf<Multiple, Ordinal>(sieve)),
                        as.Transition(as.number(totalIndices)),
                    )

                    return use.Ordinal(as.Cycle(previousKernel), nextIndex)
                }),
        )
    }

export {
    computeNextKernel,
}
