import { applyOffset, applyScale, Block, EVERY_OTHER, from, Index, to } from '../../../../src'

const buildBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        for (let i: Index = to.Index(0); i < to.Index(block.length); i = applyOffset(i, to.Offset(1))) {
            nextBlock.push(block[applyScale(from.Index(i), EVERY_OTHER) % block.length])
        }

        return nextBlock
    }

export {
    buildBlock,
}
