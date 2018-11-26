import { deepEqual } from '@musical-patterns/utilities'
import { Block, to } from '../../../../nominal'
import { buildBlock } from '../materials'
import { Cycle } from '../types'

const buildCycle: (block: Block) => Cycle =
    (block: Block): Cycle => {
        const cycle: Cycle = [ block.slice() ].map(to.Block)

        let nextBlock: Block = buildBlock(block)
        while (!deepEqual(block, nextBlock)) {
            cycle.push(to.Block(nextBlock.slice()))
            nextBlock = buildBlock(nextBlock)
        }

        return cycle
    }

export {
    buildCycle,
}
