import { Rhythm } from './types'
import * as to from './utilities/to'

const fiveRhythm: Rhythm = to.Rhythm([ 0, 1, 0, 0, 1 ])

const sevenRhythm: Rhythm = to.Rhythm([ 0, 0, 0, 1, 0, 0, 1 ])

const nineRhythm: Rhythm = to.Rhythm([ 0, 0, 0, 0, 0, 0, 1, 1, 1 ])

export {
    fiveRhythm,
    sevenRhythm,
    nineRhythm,
}
