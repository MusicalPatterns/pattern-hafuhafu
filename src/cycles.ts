import { Notes } from '../../../src/types'
import sequence from '../../../src/utilities/sequence'
import { BAR_COUNT } from './constants'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNotes } from './hafuhafuNotes'
import { fiveRhythm, nineRhythm, sevenRhythm } from './rhythms'
import { Rhythm } from './types'

const rhythmToCycleOfNotes: (sourceRhythm: Rhythm) => Notes =
    (sourceRhythm: Rhythm): Notes =>
        sequence(hafuhafuCycle(sourceRhythm).map((rhythm: Rhythm): Notes =>
            hafuhafuNotes(rhythm, BAR_COUNT)))

const fiveCycle: Notes = rhythmToCycleOfNotes(fiveRhythm)

const sevenCycle: Notes = rhythmToCycleOfNotes(sevenRhythm)

const nineCycle: Notes = rhythmToCycleOfNotes(nineRhythm)

export {
    fiveCycle,
    sevenCycle,
    nineCycle,
}
