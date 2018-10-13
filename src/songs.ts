import { SongID, SongSpec } from '../../../src/songTypes'
import { Frequency, Scalar } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import { compileHafuhafuSong, compileHafuhafuWithPitchCircularitySong } from './compile'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { octaveSeriesScale } from './scales'
import * as to from './utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_BASE_FREQUENCY: Frequency = 50 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

const hafuhafuSongSpec: SongSpec = {
    compile: compileHafuhafuSong,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: HAFUHAFU_DURATION_SCALAR,
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    entitySpecs: [],
    scales: [
        octaveSeriesScale,
    ],
    songId: SongID.HAFUHAFU,
}

const hafuhafuWithPitchCircularitySongSpec: SongSpec = {
    compile: compileHafuhafuWithPitchCircularitySong,
    config: {
        baseFrequency: HAFUHAFU_BASE_FREQUENCY,
        durationScalar: scale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
        rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    },
    entitySpecs: [],
    scales: [
        octaveSeriesScale,
    ],
    songId: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
}

export {
    hafuhafuSongSpec,
    hafuhafuWithPitchCircularitySongSpec,
}
