import { NoteSpec } from '@musical-patterns/compiler'
import {
    PitchDurationGain,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/pattern'
import { ContourElement, from, Scalar, to, translateFromOneIndexedToZeroIndexed } from '@musical-patterns/utilities'

const buildNoteSpec: (buildNoteSpecParameters: ContourElement<PitchDurationGain>) => NoteSpec =
    ([ pitch, duration, gain ]: ContourElement<PitchDurationGain>): NoteSpec => {
        if (pitch <= 0) {
            return {
                durationSpec: {
                    scalar: to.Scalar(duration),
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gainSpec: {
                    scalar: from.Amplitude(SILENT) as Scalar,
                },
                sustainSpec: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
            }
        }

        return {
            durationSpec: {
                scalar: to.Scalar(duration),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
            gainSpec: {
                scalar: to.Scalar(gain),
            },
            pitchSpec: {
                index: translateFromOneIndexedToZeroIndexed(to.Ordinal(pitch)),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustainSpec: {
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
        }
    }

export {
    buildNoteSpec,
}
