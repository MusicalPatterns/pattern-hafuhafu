import { BuildScalesFunction, buildStandardScales, Scale } from '../../../src'
import { HafuhafuSongSpec } from './types'

const buildHafuhafuScales: BuildScalesFunction =
    (songSpec: HafuhafuSongSpec): Scale[] => {
        const { flatDurationsScale, octaveSeriesScale } = buildStandardScales()

        return [
            flatDurationsScale,
            {
                scalar: songSpec.songDurationScalar,
                scalars: flatDurationsScale.scalars,
            },
            {
                scalar: songSpec.songPitchScalar,
                scalars: octaveSeriesScale.scalars,
            },
        ]
    }

export {
    buildHafuhafuScales,
}
