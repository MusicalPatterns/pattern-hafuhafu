import { BuildScalesFunction, buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { HafuhafuPatternSpec } from '../types'

const buildScales: BuildScalesFunction =
    (patternSpec: HafuhafuPatternSpec): Scale[] => {
        const { nonScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(
            nonScale.scalars,
            patternSpec.patternDurationScalar,
        )
        const pitchesScale: Scale = scaleFromScalarsAndScalar(
            octaveSeriesScale.scalars,
            patternSpec.patternPitchScalar,
        )

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
