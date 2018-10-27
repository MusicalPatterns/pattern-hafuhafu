import { BuildScalesFunction, buildStandardScales, Scale, SongSpec } from '../../../src'

const buildHafuhafuScales: BuildScalesFunction =
    (songSpec: SongSpec): Scale[] => {
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
