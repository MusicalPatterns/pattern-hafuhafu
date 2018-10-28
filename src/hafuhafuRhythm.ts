import { applyOffset, applyScale, EVERY_OTHER, from, Index, to } from '../../../src'
import { to as hafuhafuTo } from './nominal'
import { Rhythm } from './types'

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
