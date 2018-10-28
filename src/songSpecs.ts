import { applyScale } from '../../../src'
import {
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_RHYTHM,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { HafuhafuSongSpec } from './types'

const hafuhafuSongSpec: HafuhafuSongSpec = {
    rhythm: HAFUHAFU_INITIAL_RHYTHM,
    songDurationScalar: HAFUHAFU_DURATION_SCALAR,
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const hafuhafuWithPitchCircularitySongSpec: HafuhafuSongSpec = {
    rhythm: HAFUHAFU_INITIAL_RHYTHM,
    songDurationScalar: applyScale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

export {
    hafuhafuSongSpec,
    hafuhafuWithPitchCircularitySongSpec,
}
