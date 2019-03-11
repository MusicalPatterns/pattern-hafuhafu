import { Note } from '@musical-patterns/compiler'
import {
    PitchDurationGain,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/pattern'
import {
    Amplitude,
    ContourElement,
    from,
    Scalar,
    to,
    translateFromOneIndexedToZeroIndexed,
} from '@musical-patterns/utilities'

const computeNote: (computeNoteParameters: ContourElement<PitchDurationGain>) => Note =
    ([ pitch, duration, gain ]: ContourElement<PitchDurationGain>): Note => {
        if (pitch <= 0) {
            return {
                duration: {
                    scalar: to.Scalar(duration),
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gain: {
                    scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(SILENT),
                },
                sustain: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
            }
        }

        return {
            duration: {
                scalar: to.Scalar(duration),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
            gain: {
                scalar: to.Scalar(gain),
            },
            pitch: {
                index: translateFromOneIndexedToZeroIndexed(to.Ordinal(pitch)),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustain: {
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
