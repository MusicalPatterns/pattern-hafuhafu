import { Rhythm } from './types'
import * as to from './utilities/to'

const fiveRhythm: Rhythm = to.Rhythm([0, 1, 0, 0, 1])

const fiveRhythmHafuhafu: Rhythm = to.Rhythm([0, 0, 1, 1, 0])

const sevenRhythm: Rhythm = to.Rhythm([0, 0, 0, 1, 0, 0, 1])

const sevenRhythmHafu: Rhythm = to.Rhythm([0, 0, 0, 1, 0, 1, 0])

const sevenRhythmHafuhafu: Rhythm = to.Rhythm([0, 0, 0, 0, 0, 1, 1])

export {
    fiveRhythm,
    fiveRhythmHafuhafu,
    sevenRhythm,
    sevenRhythmHafu,
    sevenRhythmHafuhafu,
}
