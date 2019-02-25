import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { buildStandardScales } from '@musical-patterns/pattern'
import { Scalar } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../spec'
import { buildScalars } from './scalars'

const buildScales: BuildScalesFunction =
    (spec: HafuhafuSpec): Scale[] => {
        const pitchScalars: Scalar[] = buildScalars(spec)

        return buildStandardScales(spec, { pitchScalars })
    }

export {
    buildScales,
}
