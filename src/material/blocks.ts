import { apply, Block, EVERY_OTHER, Ordinal, to } from '@musical-patterns/utilities'

const buildNextBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        for (
            let index: Ordinal = to.Ordinal(0);
            index < to.Ordinal(block.length);
            index = apply.Translation(index, to.Translation(1))
        ) {
            const blockIndex: Ordinal = apply.Modulus(
                apply.Cardinal(index, EVERY_OTHER),
                to.Modulus(block.length),
            )

            nextBlock.push(apply.Ordinal(block, blockIndex))
        }

        return nextBlock
    }

export {
    buildNextBlock,
}
