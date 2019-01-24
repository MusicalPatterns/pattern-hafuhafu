import { apply, Block, EVERY_OTHER, from, Index, to } from '@musical-patterns/utilities'

const buildNextBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        for (let i: Index = to.Index(0); i < to.Index(block.length); i = apply.Offset(i, to.Offset(1))) {
            nextBlock.push(block[ apply.Scalar(from.Index(i), EVERY_OTHER) % block.length ])
        }

        return nextBlock
    }

export {
    buildNextBlock,
}
