import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import {
    Amplitude,
    apply,
    Block,
    Cardinal,
    ContourElement,
    Frequency,
    from,
    insteadOf,
    Multiple,
    NormalScalar,
    Ordinal,
    Scalar,
    Time,
    to,
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
        const layerIndex: Ordinal = apply.Ordinal(layerIndices, insteadOf<Ordinal, Ordinal>(iterationIndex))

        return apply.Ordinal(
            apply.Ordinal(
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

        return to.ContourElement<PitchDurationGainSustainScale>([
            from.Ordinal(pitchIndex),
            from.Scalar<Time>(duration),
            from.Scalar<Amplitude>(gain),
            from.Scalar<Time>(sustain),
            from.Scalar<Frequency>(pitchScalar),
        ])
    }

export {
    computeElement,
}
