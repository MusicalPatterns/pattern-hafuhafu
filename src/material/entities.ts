import { Entity, MaterializeEntities, TimbreNameEnum } from '@musical-patterns/material'
import { HafuhafuSpecs } from '../spec'
import { computeNotes } from './notes'

const materializeEntities: MaterializeEntities =
    (specs: HafuhafuSpecs): Entity[] => [
        {
            sections: [ { notes: computeNotes(specs) } ],
            timbreName: TimbreNameEnum.WURLITZER,
        },
    ]

export {
    materializeEntities,
}
