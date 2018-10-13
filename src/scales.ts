import { Scale } from '../../../src/types'
import { Offset, Power, Scalar } from '../../../src/utilities/nominalTypes'
import numbers from '../../../src/utilities/numbers'
import offset from '../../../src/utilities/offset'
import raise from '../../../src/utilities/raise'
import * as to from '../../../src/utilities/to'

// tslint:disable-next-line:no-any no-magic-numbers
const OCTAVE: Scalar = 2 as any
// tslint:disable-next-line:no-any no-magic-numbers
const POWER_OFFSET: Offset = -1 as any

const octaveSeriesScale: Scale = numbers.map(to.Power).map((power: Power): Scalar =>
    raise(OCTAVE, offset(power, POWER_OFFSET)))

export {
    octaveSeriesScale,
}
