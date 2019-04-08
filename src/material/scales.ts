import { MaterializeScales, materializeStandardScales, Scale } from '@musical-patterns/material'
import { Scalar } from '@musical-patterns/utilities'
import { HafuhafuSpecs } from '../spec'
import { computeScalars } from './scalars'

const materializeScales: MaterializeScales =
    (specs: HafuhafuSpecs): Scale[] => {
        const pitchScalars: Scalar[] = computeScalars(specs)

        return materializeStandardScales(specs, { pitchScalars })
    }

export {
    materializeScales,
}
