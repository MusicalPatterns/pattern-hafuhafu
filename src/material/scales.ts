import { MaterializeScales, Scale } from '@musical-patterns/compiler'
import { materializeStandardScales } from '@musical-patterns/pattern'
import { Scalar } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { computeScalars } from './scalars'

const materializeScales: MaterializeScales =
    (spec: HafuhafuSpec): Scale[] => {
        const pitchScalars: Scalar[] = computeScalars(spec)

        return materializeStandardScales(spec, { pitchScalars })
    }

export {
    materializeScales,
}
