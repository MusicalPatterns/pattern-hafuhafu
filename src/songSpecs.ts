import { applyScale, Scalar } from '../../../src'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { to } from './nominal'
import { HafuhafuSongSpec } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_PITCH_SCALAR: Scalar = 50 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

const hafuhafuSongSpec: HafuhafuSongSpec = {
    rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    songDurationScalar: HAFUHAFU_DURATION_SCALAR,
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const hafuhafuWithPitchCircularitySongSpec: HafuhafuSongSpec = {
    rhythm: to.Rhythm([ 0, 1, 0, 0, 1 ]),
    songDurationScalar: applyScale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

export {
    hafuhafuSongSpec,
    hafuhafuWithPitchCircularitySongSpec,
}
