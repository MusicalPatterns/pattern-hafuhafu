import { BaseSongSpec } from '../../../src/songTypes'
import applyScale from '../../../src/utilities/applyScale'
import { Scalar } from '../../../src/utilities/nominalTypes'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from './constants'
import { Rhythm } from './types'
import * as to from './utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_PITCH_SCALAR: Scalar = 50 as any
// tslint:disable-next-line:no-any no-magic-numbers
const HAFUHAFU_DURATION_SCALAR: Scalar = 25 as any

interface HafuhafuSongSpec extends BaseSongSpec {
    rhythm: Rhythm,
}

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
    HafuhafuSongSpec,
}
