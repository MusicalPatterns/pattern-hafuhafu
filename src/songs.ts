import { applyScale } from '../../../src'
import { SongId } from '../../songId'
import { Song, SongMaterial, SongMetadata } from '../../types'
import {
    HAFUHAFU_DURATION_SCALAR,
    HAFUHAFU_INITIAL_BLOCK,
    HAFUHAFU_PITCH_SCALAR,
    HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
} from './constants'
import { buildHafuhafuEntities, buildHafuhafuScales, buildHafuhafuWithPitchCircularityEntities } from './materials'
import { HafuhafuSongSpec } from './types'

const hafuhafuSongMaterial: SongMaterial = {
    buildEntitiesFunction: buildHafuhafuEntities,
    buildScalesFunction: buildHafuhafuScales,
}

const hafuhafuWithPitchCircularitySongMaterial: SongMaterial = {
    buildEntitiesFunction: buildHafuhafuWithPitchCircularityEntities,
    buildScalesFunction: buildHafuhafuScales,
}

const hafuhafuSongMetadata: SongMetadata = {
    description: 'blockic circularity; blocks within themselves',
    formattedName: 'Hafuhafu',
}

const hafuhafuWithPitchCircularitySongMetadata: SongMetadata = {
    description: 'blockic circularity with extraneous and slipshod pitch circularity',
    formattedName: 'Hafuhafu (with pitch circularity)',
}

const hafuhafuSongSpec: HafuhafuSongSpec = {
    block: HAFUHAFU_INITIAL_BLOCK,
    songDurationScalar: HAFUHAFU_DURATION_SCALAR,
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const hafuhafuWithPitchCircularitySongSpec: HafuhafuSongSpec = {
    block: HAFUHAFU_INITIAL_BLOCK,
    songDurationScalar: applyScale(HAFUHAFU_DURATION_SCALAR, HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR),
    songPitchScalar: HAFUHAFU_PITCH_SCALAR,
}

const hafuhafuSong: Song = {
    material: hafuhafuSongMaterial,
    metadata: hafuhafuSongMetadata,
    songId: SongId.HAFUHAFU,
    spec: hafuhafuSongSpec,
}

const hafuhafuWithPitchCircularitySong: Song = {
    material: hafuhafuWithPitchCircularitySongMaterial,
    metadata: hafuhafuWithPitchCircularitySongMetadata,
    songId: SongId.HAFUHAFU_WITH_PITCH_CIRCULARITY,
    spec: hafuhafuWithPitchCircularitySongSpec,
}

export {
    hafuhafuSong,
    hafuhafuWithPitchCircularitySong,
}
