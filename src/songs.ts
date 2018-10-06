import { defaultSongCompile } from '../../../src/compile/defaultSongCompile'
import { Song, SongName } from '../../../src/songTypes'
import { Frequency, Scalar } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { hafuhafuEntity, hafuhafuInEntity, hafuhafuOutEntity } from './entities'
import { octaveSeries } from './pitches'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_BASE_FREQUENCY: Frequency = 440 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

const hafuhafu: Song = {
    compile: defaultSongCompile,
    customConfig: {},
    description: 'rhythmic circularity; rhythms within themselves',
    entityConfigs: [
        hafuhafuEntity,
    ],
    formattedName: 'Hafuhafu',
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
    compile: defaultSongCompile,
    customConfig: {},
    description: 'rhythmic circularity with extraneous and slipshod pitch circularity',
    entityConfigs: [
        hafuhafuInEntity,
        hafuhafuOutEntity,
    ],
    formattedName: 'Hafuhafu (with pitch circularity)',
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
