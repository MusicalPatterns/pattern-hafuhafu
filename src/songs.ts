import { defaultSongCompile } from '../../../src/compile/defaultSongCompile'
import { Song, SongName } from '../../../src/songTypes'
import { HAFUHAFU_BASE_FREQUENCY } from './basePitch'
import { hafuhafuEntity, hafuhafuInEntity, hafuhafuOutEntity } from './entities'
import { octaveSeries } from './pitches'

const hafuhafu: Song = {
    baseFrequency: HAFUHAFU_BASE_FREQUENCY,
    compile: defaultSongCompile,
    config: {},
    entityConfigs: [
        hafuhafuEntity,
    ],
    formattedName: 'Hafuhafu',
    name: SongName.HAFUHAFU,
    scales: [
        octaveSeries,
    ],
}

const hafuhafuWithPitchCircularity: Song = {
    baseFrequency: HAFUHAFU_BASE_FREQUENCY,
    compile: defaultSongCompile,
    config: {},
    entityConfigs: [
        hafuhafuInEntity,
        hafuhafuOutEntity,
    ],
    formattedName: 'Hafuhafu (with pitch circularity)',
    name: SongName.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    scales: [
        octaveSeries,
    ],
}

export {
    hafuhafu,
    hafuhafuWithPitchCircularity,
}
