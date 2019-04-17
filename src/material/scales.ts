import { MaterializeScales, materializeStandardScales, Scale } from '@musical-patterns/material'
import { HafuhafuSpecs } from '../spec'
import { computePitchScalars } from './scalars'

const materializeScales: MaterializeScales =
    (specs: HafuhafuSpecs): Scale[] =>
        materializeStandardScales(specs, { pitchScalars: computePitchScalars(specs) })

export {
    materializeScales,
}
