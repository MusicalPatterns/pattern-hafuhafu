import {
    Note,
    PitchDurationGainSustainScale,
    SILENT,
    STANDARD_DURATION_SCALE_INDEX,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { as, ContourElement, Duration, Gain, notAs, Pitch, Scalar } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchDurationGainSustainScale>) => Note =
    ([ pitch, duration, gain, sustain, scale ]: ContourElement<PitchDurationGainSustainScale>): Note => {
        if (pitch === notAs.Ordinal<Scalar[]>(STANDARD_PITCH_INDEX_INDICATING_REST)) {
            return {
                duration: {
                    scalar: as.Scalar<Duration>(duration),
                    scaleIndex: STANDARD_DURATION_SCALE_INDEX,
                },
                gain: {
                    scalar: SILENT,
                },
                sustain: {
                    scaleIndex: STANDARD_DURATION_SCALE_INDEX,
                },
            }
        }

        return {
            duration: {
                scalar: as.Scalar<Duration>(duration),
                scaleIndex: STANDARD_DURATION_SCALE_INDEX,
            },
            gain: {
                scalar: as.Scalar<Gain>(gain),
            },
            pitch: {
                index: as.Ordinal<Array<Scalar<Pitch>>>(pitch),
                scalar: as.Scalar<Pitch>(scale),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            sustain: {
                scalar: as.Scalar<Duration>(sustain),
                scaleIndex: STANDARD_DURATION_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
