import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { to } from '@musical-patterns/utilities'
import { buildStandardScales } from '@musical-patterns/utilities-pattern'
import { HafuhafuPatternSpec } from '../types'

const buildScales: BuildScalesFunction =
    (patternSpec: HafuhafuPatternSpec): Scale[] => {
        const { nonScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            offset: patternSpec.patternDurationOffset || to.Offset(0),
            scalar: patternSpec.patternDurationScalar || to.Scalar(1),
            scalars: nonScale.scalars,
        }
        const pitchesScale: Scale = {
            offset: patternSpec.patternPitchOffset || to.Offset(0),
            scalar: patternSpec.patternPitchScalar || to.Scalar(1),
            scalars: octaveSeriesScale.scalars,
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
