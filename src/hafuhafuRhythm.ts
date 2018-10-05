import * as from from '../../../src/utilities/from'
import { Index, Scalar } from '../../../src/utilities/nominalTypes'
import offset from '../../../src/utilities/offset'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { Rhythm } from './types'
import * as hafuhafuTo from './utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const EVERY_OTHER: Scalar = 2 as any

const hafuhafuRhythm: (rhythm: Rhythm) => Rhythm =
    (rhythm: Rhythm): Rhythm => {
        const output: Rhythm = hafuhafuTo.Rhythm([])
        for (let i: Index = to.Index(0); i < to.Index(rhythm.length); i = offset(i, to.Offset(1))) {
            output.push(rhythm[scale(from.Index(i), EVERY_OTHER) % rhythm.length])
        }

        return output
    }

export {
    hafuhafuRhythm,
}
