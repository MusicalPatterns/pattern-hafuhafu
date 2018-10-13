import { EntityConfig, EntityConfigs, TimeType } from '../../../src/compile/types'
import { Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import rotateCycle from '../../../src/utilities/rotateCycle'
import sequence from '../../../src/utilities/sequence'
import * as to from '../../../src/utilities/to'
import { BAR_COUNT } from './constants'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNotes } from './hafuhafuNotes'
import { hafuhafuWithPitchCircularityNotes } from './hafuhafuWithPitchCircularityNotes'
import { Direction, Rhythm } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const buildHafuhafuEntityConfigs: (rhythm: Rhythm) => EntityConfigs =
    (rhythm: Rhythm): EntityConfigs => {
        const hafuhafuEntity: EntityConfig = {
            notes: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuNotes(cycleRhythm, BAR_COUNT))),
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        return [
            hafuhafuEntity,
        ]
    }

const buildHafuhafuWithPitchCircularityEntityConfigs: (rhythm: Rhythm) => EntityConfigs =
    (rhythm: Rhythm): EntityConfigs => {
        const hafuhafuInEntity: EntityConfig = {
            notes: sequence(
                rotateCycle(hafuhafuCycle(rhythm), to.Offset(1)).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(cycleRhythm, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const hafuhafuOutEntity: EntityConfig = {
            notes: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(cycleRhythm, BAR_COUNT, Direction.OUT)),
            ),
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        return [
            hafuhafuInEntity,
            hafuhafuOutEntity,
        ]
    }

export {
    buildHafuhafuEntityConfigs,
    buildHafuhafuWithPitchCircularityEntityConfigs,
}
