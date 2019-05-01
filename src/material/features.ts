import {
    Note,
    PitchValueIntensityEnvelopeScale,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_PITCH_SCALE_INDEX,
    STANDARD_VALUE_SCALE_INDEX,
} from '@musical-patterns/material'
import { as, ContourElement, Intensity, Pitch, Scalar, Value } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchValueIntensityEnvelopeScale>) => Note =
    ([ pitch, value, intensity, envelope, scale ]: ContourElement<PitchValueIntensityEnvelopeScale>): Note => {
        if (pitch === as.number(STANDARD_PITCH_INDEX_INDICATING_REST)) {
            return {
                envelope: {
                    scaleIndex: STANDARD_VALUE_SCALE_INDEX,
                },
                intensity: {
                    scalar: SILENT,
                },
                value: {
                    scalar: as.Scalar<Value>(value),
                    scaleIndex: STANDARD_VALUE_SCALE_INDEX,
                },
            }
        }

        return {
            envelope: {
                scalar: as.Scalar<Value>(envelope),
                scaleIndex: STANDARD_VALUE_SCALE_INDEX,
            },
            intensity: {
                scalar: as.Scalar<Intensity>(intensity),
            },
            pitch: {
                index: as.Ordinal<Array<Scalar<Pitch>>>(pitch),
                scalar: as.Scalar<Pitch>(scale),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            },
            value: {
                scalar: as.Scalar<Value>(value),
                scaleIndex: STANDARD_VALUE_SCALE_INDEX,
            },
        }
    }

export {
    computeNote,
}
