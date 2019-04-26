import { computeNominalInterface, DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Layer = Number & { _NominalBrand: 'Layer' }

const { as } = computeNominalInterface({
    number: {
        Layer: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Layer,
    },
})

export {
    as,
    Layer,
}
