import { compileEntity } from '../../../src/compile/compileEntity'
import { EntitySpec, EntitySpecs } from '../../../src/compile/types'
import { Song, SongID, SongSpec } from '../../../src/songTypes'
import { Entity } from '../../../src/types'
import { buildHafuhafuEntitySpecs, buildHafuhafuWithPitchCircularityEntitySpecs } from './entities'
import { HafuhafuConfig, Rhythm } from './types'

const compileHafuhafuSong: (songSpec: SongSpec) => Promise<Song> =
    async (songSpec: SongSpec): Promise<Song> => {
        const config: HafuhafuConfig = songSpec.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entitySpecs: EntitySpecs = buildHafuhafuEntitySpecs(rhythm)

        return {
            entities: entitySpecs.map((entitySpec: EntitySpec): Entity =>
                compileEntity(entitySpec, songSpec)),
            songId: SongID.HAFUHAFU,
        }
    }

const compileHafuhafuWithPitchCircularitySong: (songSpec: SongSpec) => Promise<Song> =
    async (songSpec: SongSpec): Promise<Song> => {
        const config: HafuhafuConfig = songSpec.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entitySpecs: EntitySpecs = buildHafuhafuWithPitchCircularityEntitySpecs(rhythm)

        return {
            entities: entitySpecs.map((entitySpec: EntitySpec): Entity =>
                compileEntity(entitySpec, songSpec)),
            songId: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
        }
    }

export {
    compileHafuhafuSong,
    compileHafuhafuWithPitchCircularitySong,
}
