import { Notes } from '../../../src/types'
import sequence from '../../../src/utilities/sequence'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNotes } from './hafuhafuNotes'
import { fiveRhythm, sevenRhythm } from './rhythms'
import { Rhythm } from './types'

const SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH: number = 16

const rhythmToCycleOfNotes: (sourceRhythm: Rhythm) => Notes =
    (sourceRhythm: Rhythm): Notes =>
        sequence(hafuhafuCycle(sourceRhythm).map((rhythm: Rhythm): Notes =>
            hafuhafuNotes(rhythm, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH)))

const fiveCycle: Notes = rhythmToCycleOfNotes(fiveRhythm)

const sevenCycle: Notes = rhythmToCycleOfNotes(sevenRhythm)

export {
    fiveCycle,
    sevenCycle,
}
