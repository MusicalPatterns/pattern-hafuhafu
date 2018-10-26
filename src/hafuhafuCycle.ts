import { deepEqual } from '../../../src'
import { hafuhafuRhythm } from './hafuhafuRhythm'
import { Rhythm, Rhythms } from './types'

const hafuhafuCycle: (rhythm: Rhythm) => Rhythms =
    (rhythm: Rhythm): Rhythms => {
        const output: Rhythms = [ rhythm.slice() ]

        let nextRhythm: Rhythm = hafuhafuRhythm(rhythm)
        while (!deepEqual(rhythm, nextRhythm)) {
            output.push(nextRhythm.slice())
            nextRhythm = hafuhafuRhythm(nextRhythm)
        }

        return output
    }

export {
    hafuhafuCycle,
}
