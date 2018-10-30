import { Block, deepEqual, to } from '../../../../src'
import { buildHafuhafuBlock } from '../materials'
import { Cycle } from '../types'

const buildHafuhafuCycle: (block: Block) => Cycle =
    (block: Block): Cycle => {
        const cycle: Cycle = [ block.slice() ].map(to.Block)

        let nextBlock: Block = buildHafuhafuBlock(block)
        while (!deepEqual(block, nextBlock)) {
            cycle.push(to.Block(nextBlock.slice()))
            nextBlock = buildHafuhafuBlock(nextBlock)
        }

        return cycle
    }

export {
    buildHafuhafuCycle,
}
