import { EntityConfig } from '../../../src/compile/types'
import { OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { fiveRhythm, fiveRhythmHafuhafu } from './rhythms'
import { hafuhafu } from './hafuhafu'
import sequence from '../../../src/utilities/sequence'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const hafuhafuEntity: EntityConfig = {
    notes: sequence([hafuhafu(fiveRhythm, 32), hafuhafu(fiveRhythmHafuhafu, 32)]),
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

export {
    hafuhafuEntity,
}
