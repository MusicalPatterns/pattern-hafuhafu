import {
    Note,
    PitchDurationGainSustainScale,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { ContourElement, from, insteadOf, Scalar, to } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchDurationGainSustainScale>) => Note =
    ([ pitch, duration, gain, sustain, scale ]: ContourElement<PitchDurationGainSustainScale>): Note => {
        if (pitch === from.Ordinal<Scalar>(STANDARD_PITCH_INDEX_INDICATING_REST)) {
            return {
                duration: {
                    scalar: to.Scalar<Scalar>(duration),
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gain: {
                    scalar: insteadOf<Scalar, Scalar>(SILENT),
                },
                sustain: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
            }
        }

        return {
            duration: {
                scalar: to.Scalar<Scalar>(duration),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
            gain: {
                scalar: to.Scalar<Scalar>(gain),
            },
            pitch: {
                index: to.Ordinal<Scalar>(pitch),
                scalar: to.Scalar<Scalar>(scale),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustain: {
                scalar: to.Scalar<Scalar>(sustain),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
