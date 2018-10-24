import { Song } from '../../src/songTypes'
import { hafuhafuSongMaterial, hafuhafuWithPitchCircularitySongMaterial } from './src/songMaterials'
import { hafuhafuSongMetadata, hafuhafuWithPitchCircularitySongMetadata } from './src/songMetadata'
import { hafuhafuSongSpec, hafuhafuWithPitchCircularitySongSpec } from './src/songSpecs'

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
