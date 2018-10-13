import { Song, SongID } from '../../../src/songTypes'
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

const hafuhafu: Song = {
    compile: hafuhafuCompile,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: HAFUHAFU_DURATION_SCALAR,
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    description: 'rhythmic circularity; rhythms within themselves',
    entityConfigs: [],
    formattedName: 'Hafuhafu',
    id: SongID.HAFUHAFU,
    scales: [
        octaveSeries,
    ],
}

const hafuhafuWithPitchCircularity: Song = {
    compile: hafuhafuWithPitchCircularityCompile,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: scale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    description: 'rhythmic circularity with extraneous and slipshod pitch circularity',
    entityConfigs: [],
    formattedName: 'Hafuhafu (with pitch circularity)',
    id: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    scales: [
        octaveSeries,
    ],
}

export {
    hafuhafu,
    hafuhafuWithPitchCircularity,
}
