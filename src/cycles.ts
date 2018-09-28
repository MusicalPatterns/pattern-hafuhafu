import { Notes } from '../../../src/types'
import sequence from '../../../src/utilities/sequence'
import { hafuhafu } from './hafuhafu'
import { fiveRhythm, fiveRhythmHafuhafu, sevenRhythm, sevenRhythmHafu, sevenRhythmHafuhafu } from './rhythms'

const SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH: number = 16

const fiveCycle: Notes = sequence([
    hafuhafu(fiveRhythm, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafu(fiveRhythmHafuhafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
])

const sevenCycle: Notes = sequence([
    hafuhafu(sevenRhythm, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafu(sevenRhythmHafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
    hafuhafu(sevenRhythmHafuhafu, SUFFICIENT_ROUND_NUMBER_OF_BARS_FOR_EFFECT_TO_BE_GRADUAL_ENOUGH),
])

export {
    fiveCycle,
    sevenCycle,
}
