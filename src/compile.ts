import { buildEntity } from '../../../src/compile/buildEntity'
import { EntityConfig, TimeType } from '../../../src/compile/types'
import { Config, Song } from '../../../src/songTypes'
import { Entities, Entity, Notes, OscillatorName, VoiceType } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import rotateCycle from '../../../src/utilities/rotateCycle'
import sequence from '../../../src/utilities/sequence'
import * as to from '../../../src/utilities/to'
import { BAR_COUNT } from './constants'
import { hafuhafuCycle } from './hafuhafuCycle'
import { hafuhafuNotes } from './hafuhafuNotes'
import { hafuhafuWithPitchCircularityNotes } from './hafuhafuWithPitchCircularityNotes'
import { Direction, Rhythm } from './types'

interface HafuhafuConfig extends Config {
    rhythm: Rhythm,
}

// tslint:disable-next-line:no-any no-magic-numbers
const TO_AVOID_BLOW_OUT: Scalar = 0.2 as any

const rhythmToCycleOfNotes: (sourceRhythm: Rhythm) => Notes =
    (sourceRhythm: Rhythm): Notes =>
        sequence(hafuhafuCycle(sourceRhythm).map((rhythm: Rhythm): Notes =>
            hafuhafuNotes(rhythm, BAR_COUNT)))

const hafuhafuCompile: (song: Song) => Promise<Entities> =
    async (song: Song): Promise<Entities> => {
        const config: HafuhafuConfig = song.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const cycle: Notes = rhythmToCycleOfNotes(rhythm)

        const hafuhafuEntity: EntityConfig = {
            notes: cycle,
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const entityConfigs: EntityConfig[] = [
            hafuhafuEntity,
        ]

        return entityConfigs.map((entityConfig: EntityConfig): Entity =>
            buildEntity(entityConfig, song))
    }

const hafuhafuWithPitchCircularityCompile: (song: Song) => Promise<Entities> =
    async (song: Song): Promise<Entities> => {
        const config: HafuhafuConfig = song.config as HafuhafuConfig
        const configRhythm: Rhythm = config.rhythm

        const hafuhafuInEntity: EntityConfig = {
            notes: sequence(
                rotateCycle(hafuhafuCycle(configRhythm), to.Offset(1)).map((rhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(rhythm, BAR_COUNT, Direction.IN)),
            ),
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const hafuhafuOutEntity: EntityConfig = {
            notes: sequence(
                hafuhafuCycle(configRhythm).map((rhythm: Rhythm): Notes =>
                    hafuhafuWithPitchCircularityNotes(rhythm, BAR_COUNT, Direction.OUT)),
            ),
            timeType: TimeType.RAW,
            voiceConfig: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
            voiceGain: TO_AVOID_BLOW_OUT,
        }

        const entityConfigs: EntityConfig[] = [
            hafuhafuInEntity,
            hafuhafuOutEntity,
        ]

        return entityConfigs.map((entityConfig: EntityConfig): Entity =>
            buildEntity(entityConfig, song))
    }

export {
    hafuhafuCompile,
    hafuhafuWithPitchCircularityCompile,
}
