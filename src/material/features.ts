import {
    Note,
    PitchDurationGainSustainScale,
    SILENT,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { Amplitude, as, ContourElement, notAs, Scalar } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchDurationGainSustainScale>) => Note =
    ([ pitch, duration, gain, sustain, scale ]: ContourElement<PitchDurationGainSustainScale>): Note => {
        if (pitch === notAs.Ordinal<Scalar[]>(STANDARD_PITCH_INDEX_INDICATING_REST)) {
            return {
                duration: {
                    scalar: as.Scalar<Scalar>(duration),
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gain: {
                    scalar: as.Scalar<Scalar>(notAs.Scalar<Amplitude>(SILENT)),
                },
                sustain: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
            }
        }

        return {
            duration: {
                scalar: as.Scalar<Scalar>(duration),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
            gain: {
                scalar: as.Scalar<Scalar>(gain),
            },
            pitch: {
                index: as.Ordinal<Scalar[]>(pitch),
                scalar: as.Scalar<Scalar>(scale),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustain: {
                scalar: as.Scalar<Scalar>(sustain),
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
