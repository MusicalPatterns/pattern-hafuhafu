import { NoteSpec } from '@musical-patterns/compiler'
import { apply, to } from '@musical-patterns/utilities'
import { DEFAULT_DURATIONS_SCALE_INDEX, DEFAULT_PITCH_SCALE_INDEX } from '@musical-patterns/utilities-pattern'
import { PITCH_INDEX_BASE_OFFSET } from '../constants'
import { BuildNoteSpecParameters } from '../types'

const buildNoteSpec: (buildNoteSpecParameters: BuildNoteSpecParameters) => NoteSpec =
    ({ cell, gain, duration, sustain, pitch }: BuildNoteSpecParameters): NoteSpec => ({
        durationSpec: {
            scalar: duration,
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
        gainSpec: {
            scalar: gain,
        },
        pitchSpec: {
            index: apply.Offset(to.Index(cell), PITCH_INDEX_BASE_OFFSET),
            scalar: pitch,
            scaleIndex: DEFAULT_PITCH_SCALE_INDEX,
        },
        sustainSpec: {
            scalar: sustain,
            scaleIndex: DEFAULT_DURATIONS_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
