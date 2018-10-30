import { applyOffset, applyScale, Block, EVERY_OTHER, from, Index, to } from '../../../../src'

const buildHafuhafuBlock: (block: Block) => Block =
    (block: Block): Block => {
        const output: Block = to.Block([])
        for (let i: Index = to.Index(0); i < to.Index(block.length); i = applyOffset(i, to.Offset(1))) {
            output.push(block[applyScale(from.Index(i), EVERY_OTHER) % block.length])
        }

        return output
    }

export {
    buildHafuhafuBlock,
}
