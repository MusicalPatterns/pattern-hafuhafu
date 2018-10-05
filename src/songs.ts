import { defaultSongCompile } from '../../../src/compile/defaultSongCompile'
import { Song, SongName } from '../../../src/songTypes'
import { HAFUHAFU_BASE_FREQUENCY } from './basePitch'
import { hafuhafuEntity, hafuhafuInEntity, hafuhafuOutEntity } from './entities'
import { octaveSeries } from './pitches'

const hafuhafu: Song = {
    compile: defaultSongCompile,
    customConfig: {},
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
    },
}

const hafuhafuWithPitchCircularity: Song = {
    compile: defaultSongCompile,
    customConfig: {},
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
    },
}

export {
    hafuhafu,
    hafuhafuWithPitchCircularity,
}
