import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import {
    Amplitude,
    as,
    Block,
    Cardinal,
    ContourElement,
    Frequency,
    insteadOf,
    Multiple,
    NormalScalar,
    notAs,
    Ordinal,
    Scalar,
    Time,
    use,
} from '@musical-patterns/utilities'
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
        const layerIndex: Ordinal = use.Ordinal(layerIndices, insteadOf<Ordinal, Ordinal>(iterationIndex))

        return use.Ordinal(
            use.Ordinal(
                layersProgresses,
                insteadOf<Ordinal, NormalScalar[]>(layerIndex),
            ),
            insteadOf<Ordinal, NormalScalar>(iterationIndex),
        )
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
    sieve: Multiple<Ordinal>,
    stretchPitch: boolean,
    totalIndices: Cardinal<Ordinal>,
}) => ContourElement<PitchDurationGainSustainScale> =
    (
        {
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
        }: ComputeElementParameters,
    ): ContourElement<PitchDurationGainSustainScale> => {
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

        return as.ContourElement<PitchDurationGainSustainScale>([
            notAs.Ordinal(pitchIndex),
            notAs.Scalar<Time>(duration),
            notAs.Scalar<Amplitude>(gain),
            notAs.Scalar<Time>(sustain),
            notAs.Scalar<Frequency>(pitchScalar),
        ])
    }

export {
    computeElement,
}
