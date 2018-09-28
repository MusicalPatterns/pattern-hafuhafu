import { Rhythm } from './types'
import * as to from './utilities/to'
import { hafuhafuRhythm } from './hafuhafuRhythm'

const fiveRhythm: Rhythm = to.Rhythm([0, 1, 0, 0, 1])

const fiveRhythmHafuhafu: Rhythm = hafuhafuRhythm(fiveRhythm)

const sevenRhythm: Rhythm = to.Rhythm([0, 0, 0, 1, 0, 0, 1])

const sevenRhythmHafu: Rhythm = hafuhafuRhythm(sevenRhythm)

const sevenRhythmHafuhafu: Rhythm = hafuhafuRhythm(sevenRhythmHafu)

export {
    fiveRhythm,
    fiveRhythmHafuhafu,
    sevenRhythm,
    sevenRhythmHafu,
    sevenRhythmHafuhafu,
}
