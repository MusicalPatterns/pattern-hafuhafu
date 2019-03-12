import { Material } from '@musical-patterns/compiler'
import { materializeEntities } from './entities'
import { materializeScales } from './scales'

const material: Material = {
    materializeEntities,
    materializeScales,
}

export {
    material,
}
