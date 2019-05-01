import {
    Note,
    PitchValueIntensityEnvelopeScale,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
} from '@musical-patterns/material'
import { as, ContourElement, Intensity, Pitch, Scalar, Value } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchValueIntensityEnvelopeScale>) => Note =
    ([ pitch, value, intensity, envelope, scale ]: ContourElement<PitchValueIntensityEnvelopeScale>): Note => {
        if (pitch === as.number(STANDARD_PITCH_INDEX_INDICATING_REST)) {
            return {
                intensity: {
                    scalar: SILENT,
                },
                value: {
                    scalar: as.Scalar<Value>(value),
                },
            }
        }

        return {
            envelope: {
                scalar: as.Scalar<Value>(envelope),
            },
            intensity: {
                scalar: as.Scalar<Intensity>(intensity),
            },
            pitch: {
                index: as.Ordinal<Array<Scalar<Pitch>>>(pitch),
                scalar: as.Scalar<Pitch>(scale),
            },
            value: {
                scalar: as.Scalar<Value>(value),
            },
        }
    }

export {
    computeNote,
}
