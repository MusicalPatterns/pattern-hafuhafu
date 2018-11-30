import { Block, to as patternTo } from '@musical-patterns/pattern'
import { apply, EVERY_OTHER, from, Index, to } from '@musical-patterns/utilities'

const buildBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = patternTo.Block([])
        for (let i: Index = to.Index(0); i < to.Index(block.length); i = apply.Offset(i, to.Offset(1))) {
            nextBlock.push(block[ apply.Scalar(from.Index(i), EVERY_OTHER) % block.length ])
        }

        return nextBlock
    }

export {
    buildBlock,
}
