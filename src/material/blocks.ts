import { apply, Block, Cycle, EVERY_OTHER, from, INITIAL, NEXT, Ordinal, to } from '@musical-patterns/utilities'

const buildNextBlock: (block: Block) => Block =
    (block: Block): Block => {
        const nextBlock: Block = to.Block([])
        const blockAsCycle: Cycle = to.Cycle(block)
        for (let index: Ordinal = INITIAL; index < to.Ordinal(block.length); index = apply.Translation(index, NEXT)) {
            const nextEveryOtherIndex: Ordinal = apply.Scalar(index, to.Scalar(from.Cardinal(EVERY_OTHER)))
            const nextEveryOtherElement: number = apply.Ordinal(blockAsCycle, nextEveryOtherIndex)
            nextBlock.push(nextEveryOtherElement)
        }

        return nextBlock
    }

export {
    buildNextBlock,
}
