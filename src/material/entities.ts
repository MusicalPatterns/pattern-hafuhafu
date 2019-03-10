import { Entity, MaterializeEntities, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Cycle, deepClone, deepEqual, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { buildNextBlock } from './blocks'
import { buildNotes } from './notes'

const buildCycle: (sourceBlock: Block) => Cycle<Block> =
    (sourceBlock: Block): Cycle<Block> => {
        const hafuhafuCycle: Cycle<Block> = to.Cycle([ deepClone(sourceBlock) ])

        let nextBlock: Block = buildNextBlock(sourceBlock)
        while (!deepEqual(sourceBlock, nextBlock)) {
            hafuhafuCycle.push(deepClone(nextBlock))
            nextBlock = buildNextBlock(nextBlock)
        }

        return hafuhafuCycle
    }

const materializeEntities: MaterializeEntities =
    (spec: HafuhafuSpec): Entity[] => {
        const sourceBlock: Block = spec.block

        const cycle: Cycle<Block> = buildCycle(sourceBlock)
        const notes: Note[] = buildNotes(cycle, spec)

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
    buildCycle,
}
