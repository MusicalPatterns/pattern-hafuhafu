import { Song } from '../../../src/types'
import { HAFUHAFU_BASE_PITCH } from './basePitch'
import { hafuhafuEntity, hafuhafuInEntity, hafuhafuOutEntity } from './entities'
import { octaveSeries } from './pitches'

const hafuhafu: Song = {
    baseFrequency: HAFUHAFU_BASE_PITCH,
    entityConfigs: [
        hafuhafuEntity,
    ],
    scales: [
        octaveSeries,
    ],
}

const hafuhafuWithPitchCircularity: Song = {
    baseFrequency: HAFUHAFU_BASE_PITCH,
    entityConfigs: [
        hafuhafuInEntity,
        hafuhafuOutEntity,
    ],
    scales: [
        octaveSeries,
    ],
}

export {
    hafuhafu,
    hafuhafuWithPitchCircularity,
}
