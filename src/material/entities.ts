import { BuildEntitiesFunction, Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { Block, Cycle, deepClone, deepEqual, sequence, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'
import { buildNextBlock } from './blocks'
import { buildPart } from './parts'
import { buildPiece } from './pieces'

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

const buildEntities: BuildEntitiesFunction =
    (spec: HafuhafuSpec): Entity[] => {
        const sourceBlock: Block = spec.block

        const cycle: Cycle<Block> = buildCycle(sourceBlock)
        const part: NoteSpec[] = buildPart(cycle, spec)

        const entity: Entity = {
            noteSpecs: part,
            timbreName: TimbreNameEnum.WURLITZER,
        }

        return [
            entity,
        ]
    }

export {
    buildEntities,
    buildCycle,
}
