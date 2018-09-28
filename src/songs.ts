import { Song } from '../../../src/types'
import { HAFUHAFU_BASE_PITCH } from './basePitch'
import { hafuhafuEntity } from './entities'
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

export {
    hafuhafu,
}
