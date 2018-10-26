import { SongMaterial } from '../../../src'
import { buildHafuhafuEntities, buildHafuhafuWithPitchCircularityEntities } from './entities'
import { buildHafuhafuScales } from './scales'

const hafuhafuSongMaterial: SongMaterial = {
    buildEntitiesFunction: buildHafuhafuEntities,
    buildScalesFunction: buildHafuhafuScales,
}

const hafuhafuWithPitchCircularitySongMaterial: SongMaterial = {
    buildEntitiesFunction: buildHafuhafuWithPitchCircularityEntities,
    buildScalesFunction: buildHafuhafuScales,
}

export {
    hafuhafuSongMaterial,
    hafuhafuWithPitchCircularitySongMaterial,
}
