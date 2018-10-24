import { BuildScalesFunction } from '../../../src/compile/types'
import { flatDurationsScale, octaveSeriesScale } from '../../../src/scales'
import { SongSpec } from '../../../src/songs'
import { Scales } from '../../../src/types'

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
