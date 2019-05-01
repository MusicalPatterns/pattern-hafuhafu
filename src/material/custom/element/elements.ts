import { PitchValueIntensityEnvelopeScale } from '@musical-patterns/material'
import {
    as,
    Block,
    Cardinal,
    ContourElement,
    insteadOf,
    Intensity,
    NormalScalar,
    Ordinal,
    Pitch,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { Layer } from '../../../nominals'
import { ExistenceStyle, HafuhafuMode } from '../../../spec'
import { LayerIndex, Sieve } from '../../../types'
import { computeEnvelope } from './envelope'
import { computeIntensity } from './intensity'
import { computePitchIndex, computePitchScalar } from './pitch'
import { ComputeElementParameters, ComputeLayerProgressParameters } from './types'
import { computeValue } from './value'

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
}) => ContourElement<PitchValueIntensityEnvelopeScale> =
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
    ): ContourElement<PitchValueIntensityEnvelopeScale> => {
        const layerProgress: NormalScalar = computeLayerProgress({ iterationIndex, layerIndices, layersProgresses })

        const pitchIndex: Ordinal<Array<Scalar<Pitch>>> =
            computePitchIndex({ iterationIndex, iterationKernel })
        const value: Scalar<Value> =
            computeValue({ iterationIndex, layerCount, mode, reverse, sieve, totalIndices })
        const intensity: Scalar<Intensity> =
            computeIntensity({ existenceStyle, layerProgress, mode })
        const envelope: Scalar<Value> =
            computeEnvelope({ sieve })
        const pitchScalar: Scalar<Pitch> =
            computePitchScalar({ layerCount, layerProgress, mode, sieve, stretchPitch })

        return as.ContourElement<PitchValueIntensityEnvelopeScale>([
            as.number(pitchIndex),
            as.number(value),
            as.number(intensity),
            as.number(envelope),
            as.number(pitchScalar),
        ])
    }

export {
    computeElement,
}
