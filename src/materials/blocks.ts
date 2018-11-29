import { apply, EVERY_OTHER, from, Index, to } from '@musical-patterns/utilities'
import { Block, to as labTo } from '../../../../nominal'

const buildBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = labTo.Block([])
        for (let i: Index = to.Index(0); i < to.Index(block.length); i = apply.Offset(i, to.Offset(1))) {
            nextBlock.push(block[ apply.Scalar(from.Index(i), EVERY_OTHER) % block.length ])
        }

        return nextBlock
    }

export {
    buildBlock,
}
