import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { buildStandardScales, StandardPatternSpecProperties } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { HafuhafuPatternSpec } from '../types'

const buildScales: BuildScalesFunction =
    (patternSpec: HafuhafuPatternSpec): Scale[] => {
        const { nonScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            offset: patternSpec[ StandardPatternSpecProperties.PATTERN_DURATION_OFFSET ] || to.Offset(0),
            scalar: patternSpec[ StandardPatternSpecProperties.PATTERN_DURATION_SCALAR ] || to.Scalar(1),
            scalars: nonScale.scalars,
        }
        const pitchesScale: Scale = {
            offset: patternSpec[ StandardPatternSpecProperties.PATTERN_PITCH_OFFSET ] || to.Offset(0),
            scalar: patternSpec[ StandardPatternSpecProperties.PATTERN_PITCH_SCALAR ] || to.Scalar(1),
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
