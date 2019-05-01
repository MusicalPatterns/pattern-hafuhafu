import { MaterializeScales, materializeStandardScales, Scales } from '@musical-patterns/material'
import { HafuhafuSpecs } from '../spec'
import { computePitchScalars } from './scalars'

const materializeScales: MaterializeScales =
    (specs: HafuhafuSpecs): Scales =>
        materializeStandardScales(specs, { pitchScalars: computePitchScalars(specs) })

export {
    materializeScales,
}
