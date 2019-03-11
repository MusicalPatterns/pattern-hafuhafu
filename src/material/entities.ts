import { Entity, MaterializeEntities, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
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
    (spec: HafuhafuSpec): Entity[] => {
        const sourceBlock: Block = spec.block

        const cycle: Cycle<Block> = computeCycle(sourceBlock)
        const notes: Note[] = computeNotes(cycle, spec)

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
