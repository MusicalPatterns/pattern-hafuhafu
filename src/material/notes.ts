import { NoteSpec } from '@musical-patterns/compiler'
import { STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { BuildNoteSpecParameters } from '../types'

const buildNoteSpec: (buildNoteSpecParameters: BuildNoteSpecParameters) => NoteSpec =
    ({ cell, gain, duration, sustain, pitch }: BuildNoteSpecParameters): NoteSpec => ({
        durationSpec: {
            scalar: duration,
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        gainSpec: {
            scalar: gain,
        },
        pitchSpec: {
            index: to.Index(cell),
            scalar: pitch,
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: sustain,
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
