import { buildEntity } from '../../../src/compile/buildEntity'
import { EntityConfig, EntityConfigs } from '../../../src/compile/types'
import { Song } from '../../../src/songTypes'
import { Entities, Entity } from '../../../src/types'
import { buildHafuhafuEntityConfigs, buildHafuhafuWithPitchCircularityEntityConfigs } from './entities'
import { HafuhafuConfig, Rhythm } from './types'

const hafuhafuCompile: (song: Song) => Promise<Entities> =
    async (song: Song): Promise<Entities> => {
        const config: HafuhafuConfig = song.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entityConfigs: EntityConfigs = buildHafuhafuEntityConfigs(rhythm)

        return entityConfigs.map((entityConfig: EntityConfig): Entity =>
            buildEntity(entityConfig, song))
    }

const hafuhafuWithPitchCircularityCompile: (song: Song) => Promise<Entities> =
    async (song: Song): Promise<Entities> => {
        const config: HafuhafuConfig = song.config as HafuhafuConfig
        const rhythm: Rhythm = config.rhythm

        const entityConfigs: EntityConfigs = buildHafuhafuWithPitchCircularityEntityConfigs(rhythm)

        return entityConfigs.map((entityConfig: EntityConfig): Entity =>
            buildEntity(entityConfig, song))
    }

export {
    hafuhafuCompile,
    hafuhafuWithPitchCircularityCompile,
}
