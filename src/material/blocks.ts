import { apply, Block, EVERY_OTHER, from, Ordinal, to } from '@musical-patterns/utilities'

const buildNextBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        for (
            let index: Ordinal = to.Ordinal(0);
            index < to.Ordinal(block.length);
            index = apply.Translation(index, to.Translation(1))
        ) {
            nextBlock.push(block[ apply.Scalar(from.Ordinal(index), EVERY_OTHER) % block.length ])
        }

        return nextBlock
    }

export {
    buildNextBlock,
}
