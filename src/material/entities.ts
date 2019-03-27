import { Entity, MaterializeEntities, TimbreNameEnum } from '@musical-patterns/compiler'
import { HafuhafuSpecs } from '../spec'
import { computeNotes } from './notes'

const materializeEntities: MaterializeEntities =
    (specs: HafuhafuSpecs): Entity[] => [
        {
            notes: computeNotes(specs),
            timbreName: TimbreNameEnum.WURLITZER,
        },
    ]

export {
    materializeEntities,
}
