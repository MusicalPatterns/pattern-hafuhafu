import { Scale } from '../../../src/types'
import { Scalar } from '../../../src/utilities/nominalTypes'
import numbers from '../../../src/utilities/numbers'
import * as to from '../../../src/utilities/to'

const OCTAVE: number = 2
const POWER_OFFSET: number = 1

const octaveSeries: Scale = numbers.map((n: number): Scalar => to.Scalar(Math.pow(OCTAVE, n - POWER_OFFSET)))

export {
    octaveSeries,
}
