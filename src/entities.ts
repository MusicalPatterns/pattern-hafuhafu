import { EntityConfig, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import rotateCycle from '../../../src/utilities/rotateCycle'
import sequence from '../../../src/utilities/sequence'
import * as to from '../../../src/utilities/to'
import { BAR_COUNT } from './constants'
import { fiveCycle } from './cycles'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuWithPitchCircularityNotes } from './hafuhafuWithPitchCircularityNotes'
import { sevenRhythm } from './rhythms'
import { Direction, Rhythm } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const hafuhafuEntity: EntityConfig = {
    notes: fiveCycle,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const hafuhafuInEntity: EntityConfig = {
    notes: sequence(
        rotateCycle(hafuhafuCycle(sevenRhythm), to.Offset(1)).map((rhythm: Rhythm): Notes =>
            hafuhafuWithPitchCircularityNotes(rhythm, BAR_COUNT, Direction.IN)),
    ),
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const hafuhafuOutEntity: EntityConfig = {
    notes: sequence(
        hafuhafuCycle(sevenRhythm).map((rhythm: Rhythm): Notes =>
            hafuhafuWithPitchCircularityNotes(rhythm, BAR_COUNT, Direction.OUT)),
    ),
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

export {
    hafuhafuEntity,
    hafuhafuInEntity,
    hafuhafuOutEntity,
}
