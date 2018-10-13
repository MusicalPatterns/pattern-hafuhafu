import { EntitySpec, EntitySpecs, TimeType } from '../../../src/compile/types'
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

const buildHafuhafuEntitySpecs: (rhythm: Rhythm) => EntitySpecs =
    (rhythm: Rhythm): EntitySpecs => {
        const hafuhafuEntitySpec: EntitySpec = {
            notes: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuNotes(cycleRhythm, BAR_COUNT))),
            timeType: TimeType.RAW,
            voiceGain: TO_AVOID_BLOW_OUT,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            hafuhafuEntitySpec,
        ]
    }

const buildHafuhafuWithPitchCircularityEntitySpecs: (rhythm: Rhythm) => EntitySpecs =
    (rhythm: Rhythm): EntitySpecs => {
        const hafuhafuInEntitySpec: EntitySpec = {
            notes: sequence(
                rotateCycle(hafuhafuCycle(rhythm), to.Offset(1)).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(cycleRhythm, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceGain: TO_AVOID_BLOW_OUT,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const hafuhafuOutEntitySpec: EntitySpec = {
            notes: sequence(
                hafuhafuCycle(rhythm).map((cycleRhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(cycleRhythm, BAR_COUNT, Direction.OUT)),
            ),
            timeType: TimeType.RAW,
            voiceGain: TO_AVOID_BLOW_OUT,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            hafuhafuInEntitySpec,
            hafuhafuOutEntitySpec,
        ]
    }

export {
    buildHafuhafuEntitySpecs,
    buildHafuhafuWithPitchCircularityEntitySpecs,
}
