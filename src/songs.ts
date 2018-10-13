import { SongConfig, SongID } from '../../../src/songTypes'
import { Frequency, Scalar } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import { hafuhafuCompile, hafuhafuWithPitchCircularityCompile } from './compile'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { octaveSeries } from './pitches'
import * as to from './utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_BASE_FREQUENCY: Frequency = 50 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

const hafuhafuSongConfig: SongConfig = {
    compile: hafuhafuCompile,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: HAFUHAFU_DURATION_SCALAR,
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    entityConfigs: [],
    scales: [
        octaveSeries,
    ],
    songId: SongID.HAFUHAFU,
}

const hafuhafuWithPitchCircularitySongConfig: SongConfig = {
    compile: hafuhafuWithPitchCircularityCompile,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: scale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    entityConfigs: [],
    scales: [
        octaveSeries,
    ],
    songId: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
}

export {
    hafuhafuSongConfig,
    hafuhafuWithPitchCircularitySongConfig,
}
