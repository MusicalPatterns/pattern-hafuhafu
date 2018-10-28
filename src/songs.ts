import { SongId } from '../../songId'
import { Song } from '../../types'
import { hafuhafuSongMaterial, hafuhafuWithPitchCircularitySongMaterial } from './songMaterials'
import { hafuhafuSongMetadata, hafuhafuWithPitchCircularitySongMetadata } from './songMetadata'
import { hafuhafuSongSpec, hafuhafuWithPitchCircularitySongSpec } from './songSpecs'

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
