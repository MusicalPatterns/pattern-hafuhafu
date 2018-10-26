import { applyOffset, applyScale, from, Index, Scalar, to } from '../../../src'
import { to as hafuhafuTo } from './nominal'
import { Rhythm } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const EVERY_OTHER: Scalar = 2 as any

const hafuhafuRhythm: (rhythm: Rhythm) => Rhythm =
    (rhythm: Rhythm): Rhythm => {
        const output: Rhythm = hafuhafuTo.Rhythm([])
        for (let i: Index = to.Index(0); i < to.Index(rhythm.length); i = applyOffset(i, to.Offset(1))) {
            output.push(rhythm[applyScale(from.Index(i), EVERY_OTHER) % rhythm.length])
        }

        return output
    }

export {
    hafuhafuRhythm,
}
