import { NoteSpec } from '@musical-patterns/compiler'
import {
    PitchDurationGain,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/pattern'
import { ContourElement, to, translateFromOneIndexedToZeroIndexed } from '@musical-patterns/utilities'

const buildNoteSpec: (buildNoteSpecParameters: ContourElement<PitchDurationGain>) => NoteSpec =
    (contourElement: ContourElement<PitchDurationGain>): NoteSpec => {
        const [ pitch, duration, gain ] = contourElement as number[]

        if (pitch <= 0) {
            return {
                durationSpec: {
                    scalar: to.Scalar(duration),
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gainSpec: {
                    scalar: SILENT,
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
