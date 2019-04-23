import { Cardinal, Multiple, Ordinal } from '@musical-patterns/utilities'
import { Layer } from './nominals'

type SieveFractalRepetitions = Multiple<Cardinal<LayerIndex[]>>

type Sieve = Multiple<LayerIndex>

type LayerIndex = Ordinal<Layer[]>

export {
    LayerIndex,
    SieveFractalRepetitions,
    Sieve,
}
