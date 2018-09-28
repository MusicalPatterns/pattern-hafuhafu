import { Rhythm } from './types'
import * as to from './utilities/to'

const EVERY_OTHER: number = 2

const hafuhafuRhythm: (rhythm: Rhythm) => Rhythm =
    (rhythm: Rhythm): Rhythm => {
        const output: Rhythm = to.Rhythm([])
        for (let i: number = 0; i < rhythm.length; i++) {
            output.push(rhythm[(i * EVERY_OTHER) % rhythm.length])
        }

        return output
    }

export {
    hafuhafuRhythm,
}
