import { BuildScalesFunction, buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { HafuhafuSongSpec } from '../types'

const buildHafuhafuScales: BuildScalesFunction =
    (songSpec: HafuhafuSongSpec): Scale[] => {
        const { flatDurationsScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = flatDurationsScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(flatDurationsScale.scalars, songSpec.songDurationScalar)
        const pitchesScale: Scale = scaleFromScalarsAndScalar(octaveSeriesScale.scalars, songSpec.songPitchScalar)

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildHafuhafuScales,
}
