import {EntityConfig, TimeType} from '../../../src/compile/types'
import { OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { fiveCycle } from './cycles'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const hafuhafuEntity: EntityConfig = {
    notes: fiveCycle,
    timeType: TimeType.RAW,
    voiceConfig: {timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR},
    voiceGain: TO_AVOID_BLOW_OUT,
}

export {
    hafuhafuEntity,
}
