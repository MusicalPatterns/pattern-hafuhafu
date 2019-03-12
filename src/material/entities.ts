import { Entity, MaterializeEntities, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeNextBlock } from './blocks'
import { computeNotes } from './notes'

const computeCycle: (sourceBlock: Block) => Cycle<Block> =
    (sourceBlock: Block): Cycle<Block> => {
        const hafuhafuCycle: Cycle<Block> = to.Cycle([ deepClone(sourceBlock) ])

        let nextBlock: Block = computeNextBlock(sourceBlock)
        while (!deepEqual(sourceBlock, nextBlock)) {
            hafuhafuCycle.push(deepClone(nextBlock))
            nextBlock = computeNextBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const materializeEntities: MaterializeEntities =
    (specs: HafuhafuSpecs): Entity[] => {
        const sourceBlock: Block = specs.block

        const cycle: Cycle<Block> = computeCycle(sourceBlock)
        const notes: Note[] = computeNotes(cycle, specs)

        const entity: Entity = {
            notes,
            timbreName: TimbreNameEnum.WURLITZER,
        }

        return [
            entity,
        ]
    }

export {
    materializeEntities,
    computeCycle,
}
