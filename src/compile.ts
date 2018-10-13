import { buildEntity } from '../../../src/compile/buildEntity'
import { EntityConfig, EntityConfigs } from '../../../src/compile/types'
import { Song, SongConfig, SongID } from '../../../src/songTypes'
import { Entity } from '../../../src/types'
import { buildHafuhafuEntityConfigs, buildHafuhafuWithPitchCircularityEntityConfigs } from './entities'
import { HafuhafuConfig, Rhythm } from './types'

const hafuhafuCompile: (songConfig: SongConfig) => Promise<Song> =
    async (songConfig: SongConfig): Promise<Song> => {
        const config: HafuhafuConfig = songConfig.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entityConfigs: EntityConfigs = buildHafuhafuEntityConfigs(rhythm)

        return {
            entities: entityConfigs.map((entityConfig: EntityConfig): Entity =>
                buildEntity(entityConfig, songConfig)),
            songId: SongID.HAFUHAFU,
        }
    }

const hafuhafuWithPitchCircularityCompile: (songConfig: SongConfig) => Promise<Song> =
    async (songConfig: SongConfig): Promise<Song> => {
        const config: HafuhafuConfig = songConfig.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entityConfigs: EntityConfigs = buildHafuhafuWithPitchCircularityEntityConfigs(rhythm)

        return {
            entities: entityConfigs.map((entityConfig: EntityConfig): Entity =>
                buildEntity(entityConfig, songConfig)),
            songId: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
        }
    }

export {
    hafuhafuCompile,
    hafuhafuWithPitchCircularityCompile,
}
