// tslint:disable ban-types

import { computeNominalInterface, DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Kernel = number[] & { _NominalBrand: 'Kernel' }

const { to, from } = computeNominalInterface({
    numericArray: {
        Kernel: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Kernel,
    },
})

export {
    to,
    from,
    Kernel,
}
