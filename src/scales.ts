import { BuildScalesFunction, flatDurationsScale, octaveSeriesScale, Scales, SongSpec } from '../../../src'

const buildHafuhafuScales: BuildScalesFunction = (songSpec: SongSpec): Scales =>
    [
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

export {
    buildHafuhafuScales,
}
