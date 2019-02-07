import { apply, Block, EVERY_OTHER, INITIAL, NEXT, Ordinal, to } from '@musical-patterns/utilities'

const buildNextBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        for (
            let index: Ordinal = INITIAL;
            index < to.Ordinal(block.length);
            index = apply.Translation(index, NEXT)
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
