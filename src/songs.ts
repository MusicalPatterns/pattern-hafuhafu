import { Song, SongName } from '../../../src/songTypes'
import { Frequency, Scalar } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import { hafuhafuCompile, hafuhafuWithPitchCircularityCompile } from './compile'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { hafuhafuHandleCustomConfigChange } from './handleCustomConfigChange'
import { octaveSeries } from './pitches'
import * as to from './utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_BASE_FREQUENCY: Frequency = 440 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

const hafuhafu: Song = {
    compile: hafuhafuCompile,
    customConfig: {
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    description: 'rhythmic circularity; rhythms within themselves',
    entityConfigs: [],
    formattedName: 'Hafuhafu',
    handleCustomConfigChange: hafuhafuHandleCustomConfigChange,
    name: SongName.HAFUHAFU,
    scales: [
        octaveSeries,
    ],
    standardConfig: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: HAFUHAFU_DURATION_SCALAR,
    },
}

const hafuhafuWithPitchCircularity: Song = {
    compile: hafuhafuWithPitchCircularityCompile,
    customConfig: {
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    description: 'rhythmic circularity with extraneous and slipshod pitch circularity',
    entityConfigs: [],
    formattedName: 'Hafuhafu (with pitch circularity)',
    handleCustomConfigChange: hafuhafuHandleCustomConfigChange,
    name: SongName.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    scales: [
        octaveSeries,
    ],
    standardConfig: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: scale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    },
}

export {
    hafuhafu,
    hafuhafuWithPitchCircularity,
}
