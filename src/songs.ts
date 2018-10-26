import { Song } from '../../../src'
import { hafuhafuSongMaterial, hafuhafuWithPitchCircularitySongMaterial } from './songMaterials'
import { hafuhafuSongMetadata, hafuhafuWithPitchCircularitySongMetadata } from './songMetadata'
import { hafuhafuSongSpec, hafuhafuWithPitchCircularitySongSpec } from './songSpecs'

const hafuhafuSong: Song = {
    material: hafuhafuSongMaterial,
    metadata: hafuhafuSongMetadata,
    spec: hafuhafuSongSpec,
}

const hafuhafuWithPitchCircularitySong: Song = {
    material: hafuhafuWithPitchCircularitySongMaterial,
    metadata: hafuhafuWithPitchCircularitySongMetadata,
    spec: hafuhafuWithPitchCircularitySongSpec,
}

export {
    hafuhafuSong,
    hafuhafuWithPitchCircularitySong,
}
