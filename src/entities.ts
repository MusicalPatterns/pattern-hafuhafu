import { EntityConfig, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import sequence from '../../../src/utilities/sequence'
import { BAR_COUNT } from './constants'
import { sevenCycle } from './cycles'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNotesWithPitchCircularity } from './hafuhafuNotesWithPitchCircularity'
import { sevenRhythm } from './rhythms'
import { rotate } from './rotate'
import { Direction, Rhythm } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const hafuhafuEntity: EntityConfig = {
    notes: sevenCycle,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const hafuhafuInEntity: EntityConfig = {
    notes: sequence(
        rotate(hafuhafuCycle(sevenRhythm), -1).map((rhythm: Rhythm): Notes =>
            hafuhafuNotesWithPitchCircularity(rhythm, BAR_COUNT, Direction.IN)),
    ),
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

const hafuhafuOutEntity: EntityConfig = {
    notes: sequence(
        hafuhafuCycle(sevenRhythm).map((rhythm: Rhythm): Notes =>
            hafuhafuNotesWithPitchCircularity(rhythm, BAR_COUNT, Direction.OUT)),
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
