import { PitchDurationGainSustainScale } from '@musical-patterns/pattern'
import {
    Amplitude,
    apply,
    Block,
    Cardinal,
    ContourElement,
    Frequency,
    from,
    NormalScalar,
    Ordinal,
    Scalar,
    Time,
    to,
} from '@musical-patterns/utilities'
import { Sieve } from '../../../nominals'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import { computeDuration } from './duration'
import { computeGain } from './gain'
import { computePitchIndex, computePitchScalar } from './pitch'
import { computeSustain } from './sustain'
import { ComputeElementParameters, ComputeLayerProgressParameters } from './types'

const computeLayerProgress: (parameters: {
    iterationIndex: Ordinal,
    layerIndices: Ordinal[],
    layersProgresses: NormalScalar[][],
}) => NormalScalar =
    ({ layerIndices, iterationIndex, layersProgresses }: ComputeLayerProgressParameters): NormalScalar => {
        const layerIndex: Ordinal = apply.Ordinal(layerIndices, iterationIndex)

        return apply.Ordinal(apply.Ordinal(layersProgresses, layerIndex), iterationIndex)
    }

const computeElement: (parameters: {
    existenceStyle: ExistenceStyle,
    iterationIndex: Ordinal,
    iterationKernel: Block,
    layerCount: Cardinal,
    layerIndices: Ordinal[],
    layersProgresses: NormalScalar[][],
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    stretchPitch: boolean,
    totalIndices: Cardinal,
}) => ContourElement<PitchDurationGainSustainScale> =
    (parameters: ComputeElementParameters): ContourElement<PitchDurationGainSustainScale> => {
        const {
            existenceStyle,
            iterationIndex,
            iterationKernel,
            layerCount,
            layerIndices,
            layersProgresses,
            mode,
            reverse,
            sieve,
            stretchPitch,
            totalIndices,
        } = parameters

        const layerProgress: NormalScalar = computeLayerProgress({ iterationIndex, layerIndices, layersProgresses })

        const pitchIndex: Ordinal =
            computePitchIndex({ iterationIndex, iterationKernel })
        const duration: Scalar<Time> =
            computeDuration({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })
        const gain: Scalar<Amplitude> =
            computeGain({ existenceStyle, layerProgress, mode })
        const sustain: Scalar<Time> =
            computeSustain({ sieve })
        const pitchScalar: Scalar<Frequency> =
            computePitchScalar({ layerCount, layerProgress, mode, sieve, stretchPitch })

        return to.ContourElement<PitchDurationGainSustainScale>([
            from.Ordinal(pitchIndex),
            from.Scalar<number, Scalar>(from.Time(duration)),
            from.Scalar<number, Scalar>(from.Amplitude(gain)),
            from.Scalar<number, Scalar>(from.Time(sustain)),
            from.Scalar<number, Scalar>(from.Frequency(pitchScalar)),
        ])
    }

export {
    computeElement,
}
