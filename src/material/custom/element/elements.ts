import { PitchDurationGainSustainScale } from '@musical-patterns/material'
import {
    as,
    Block,
    Cardinal,
    ContourElement,
    Frequency,
    Gain,
    insteadOf,

    NormalScalar,
    Ordinal,
    Scalar,
    Time,
    use,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeDuration } from './duration'
import { computeGain } from './gain'
import { computePitchIndex, computePitchScalar } from './pitch'
import { computeSustain } from './sustain'
import { ComputeElementParameters, ComputeLayerProgressParameters } from './types'

const computeLayerProgress: (parameters: {
    iterationIndex: Ordinal<Block>,
    layerIndices: LayerIndex[],
    layersProgresses: NormalScalar[][],
}) => NormalScalar =
    ({ layerIndices, iterationIndex, layersProgresses }: ComputeLayerProgressParameters): NormalScalar => {
        const layerIndex: LayerIndex = insteadOf<Ordinal, Layer[]>(use.Ordinal(
            layerIndices,
            insteadOf<Ordinal, LayerIndex[]>(iterationIndex)),
        )

        return use.Ordinal(
            use.Ordinal(
                layersProgresses,
                insteadOf<Ordinal, NormalScalar[][]>(layerIndex),
            ),
            insteadOf<Ordinal, NormalScalar[]>(iterationIndex),
        )
    }

const computeElement: (parameters: {
    existenceStyle: ExistenceStyle,
    iterationIndex: Ordinal<Block>,
    iterationKernel: Block,
    layerCount: Cardinal<Layer[]>,
    layerIndices: LayerIndex[],
    layersProgresses: NormalScalar[][],
    mode: HafuhafuMode,
    reverse: boolean,
    sieve: Sieve,
    stretchPitch: boolean,
    totalIndices: Cardinal<LayerIndex[]>,
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
        const gain: Scalar<Gain> =
            computeGain({ existenceStyle, layerProgress, mode })
        const sustain: Scalar<Time> =
            computeSustain({ sieve })
        const pitchScalar: Scalar<Frequency> =
            computePitchScalar({ layerCount, layerProgress, mode, sieve, stretchPitch })

        return as.ContourElement<PitchDurationGainSustainScale>([
            as.number(pitchIndex),
            as.number(duration),
            as.number(gain),
            as.number(sustain),
            as.number(pitchScalar),
        ])
    }

export {
    computeElement,
}
