import { BuildScalesFunction, buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { HafuhafuPatternSpec } from '../types'

const buildHafuhafuScales: BuildScalesFunction =
    (patternSpec: HafuhafuPatternSpec): Scale[] => {
        const { flatDurationsScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = flatDurationsScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(
            flatDurationsScale.scalars,
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
    buildHafuhafuScales,
}
