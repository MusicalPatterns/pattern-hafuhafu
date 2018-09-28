import { Notes } from '../../../src/types'
import sequence from '../../../src/utilities/sequence'
import { hafuhafuNotes } from './hafuhafuNotes'
import { fiveRhythm, fiveRhythmHafuhafu, sevenRhythm, sevenRhythmHafu, sevenRhythmHafuhafu } from './rhythms'

const SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH: number = 16

const fiveCycle: Notes = sequence([
    hafuhafuNotes(fiveRhythm, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafuNotes(fiveRhythmHafuhafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
])

const sevenCycle: Notes = sequence([
    hafuhafuNotes(sevenRhythm, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafuNotes(sevenRhythmHafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafuNotes(sevenRhythmHafuhafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
])

export {
    fiveCycle,
    sevenCycle,
}
