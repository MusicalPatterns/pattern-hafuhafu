import { Note } from '@musical-patterns/compiler'
import {
    PitchDurationGainSustainScale,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/pattern'
import { Amplitude, ContourElement, from, Scalar, to } from '@musical-patterns/utilities'

const computeNote: (computeNoteParameters: ContourElement<PitchDurationGainSustainScale>) => Note =
    ([ pitch, duration, gain, sustain, scale ]: ContourElement<PitchDurationGainSustainScale>): Note => {
        if (pitch === STANDARD_PITCH_INDEX_INDICATING_REST) {
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
                index: to.Ordinal(pitch),
                scalar: to.Scalar(scale),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustain: {
                scalar: to.Scalar(sustain),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
