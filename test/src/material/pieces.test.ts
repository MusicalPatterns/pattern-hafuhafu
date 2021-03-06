// tslint:disable no-duplicate-string

import { PitchValueIntensityEnvelopeScale } from '@musical-patterns/material'
import {
    as,
    Block,
    Cardinal,
    computeLength,
    ContourElement,
    ContourPiece,
    Cycle,
    dividesEvenly,
    evenElements,
    everyNthElement,
    forEach,
    indexOfFinalElement,
    INITIAL,
    oddElements,
    Ordinal,
    slice,
    use,
    VERY_LOW_PRECISION,
} from '@musical-patterns/utilities'
import {
    computePiece,
    ExistenceStyle,
    HafuhafuMode,
    HafuhafuSpecs,
    initialSpecs,
    Layer,
    LayerIndex,
    Sieve,
    SieveFractalRepetitions,
} from '../../../src/indexForTest'
import {
    INDEX_OF_DURATION_IN_CONTOUR,
    INDEX_OF_ENVELOPE_IN_CONTOUR,
    INDEX_OF_GAIN_IN_CONTOUR,
    INDEX_OF_PITCH_SCALAR_IN_CONTOUR,
} from '../../support'

describe('compute piece', (): void => {
    const A_VERY_LARGE_NUMBER_OF_REPETITIONS_WHICH_IMPROVES_MY_ABILITY_TEST_GOING_FROM_ONE_VALUE_TO_ANOTHER_AS_THE_VALUES_I_CHECK_ARE_NOT_QUITE_AT_THE_BEGINNINGS_AND_ENDS_OF_THE_ARRAYS_SO_THE_HIGHER_THE_RESOLUTION_THE_MORE_ACCURATE: SieveFractalRepetitions = as.Multiple<Cardinal<LayerIndex[]>>(100)

    describe('droste mode', (): void => {
        let piece: ContourPiece<PitchValueIntensityEnvelopeScale>
        const iterationKernel: Block = as.Block([ 10, 30, 50, 70, 90 ])
        const sieveFractalRepetitions: SieveFractalRepetitions = A_VERY_LARGE_NUMBER_OF_REPETITIONS_WHICH_IMPROVES_MY_ABILITY_TEST_GOING_FROM_ONE_VALUE_TO_ANOTHER_AS_THE_VALUES_I_CHECK_ARE_NOT_QUITE_AT_THE_BEGINNINGS_AND_ENDS_OF_THE_ARRAYS_SO_THE_HIGHER_THE_RESOLUTION_THE_MORE_ACCURATE
        const existenceStyle: ExistenceStyle = ExistenceStyle.FADE

        describe('with 3 layers', (): void => {
            beforeEach((): void => {
                const specs: HafuhafuSpecs = {
                    ...initialSpecs,
                    existenceStyle,
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions,
                    stretchPitch: true,
                }
                piece = computePiece(iterationKernel, specs)
            })

            it('has length equal to the sieve fractal repetitions times the sieve to the power of the layer count minus 1, plus one extra for realignment', (): void => {
                expect(computeLength(piece))
                    .toEqual(as.Cardinal<ContourPiece<PitchValueIntensityEnvelopeScale>>(401))
            })

            describe('value', (): void => {
                it('the value decreases quadratically from 1 to 1/sieve', (): void => {
                    const values: number[] = piece.map(
                        (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_DURATION_IN_CONTOUR),
                    )

                    expect(values)
                        .toGoMonotonicallyFromValueToValue(1, 1 / 2, VERY_LOW_PRECISION)
                })
            })

            describe('intensity', (): void => {
                it('the intensity on the even elements (layer 1 of 3) decreases from 1 to almost 0', (): void => {
                    const evenIntensities: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(evenIntensities)
                        .toGoMonotonicallyFromValueToValue(1, 0, VERY_LOW_PRECISION)
                })

                it('the intensity on the even elements of the odd elements (layer 2 of 3) increases from almost 0 to almost 1 - crossing the evens in the middle at 0.5', (): void => {
                    const evenOddIntensities: number[] = evenElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(evenOddIntensities)
                        .toGoMonotonicallyFromValueToValue(0, 1, VERY_LOW_PRECISION)
                })

                it('the intensity on all the other elements (layer 3 of 3, AKA the non-layer) is set at 0', (): void => {
                    const oddOddIntensities: number[] = oddElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(oddOddIntensities)
                        .toBeHomogenous(0)
                })
            })

            describe('pitch index', (): void => {
                it('wraps around the kernel over and over', (): void => {
                    forEach(
                        piece,
                        ([ pitchIndex, value, intensity, sustain, pitchScalar ]: ContourElement<PitchValueIntensityEnvelopeScale>, index: Ordinal<ContourPiece<PitchValueIntensityEnvelopeScale>>): void => {
                            expect(pitchIndex)
                                .toBe(iterationKernel[ as.number(index) % iterationKernel.length ])
                        },
                    )
                })
            })

            describe('pitch scalar, with stretch pitch true', (): void => {
                it('the pitch on the even elements (layer 1 of 3) is scaled, by a factor increasing quadratically from 1 to sieve, because the first layer is the highest pitch, fastest one, about to fade out', (): void => {
                    const evenPitchScalars: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenPitchScalars)
                        .toGoQuadraticallyFromValueToValue(1, 2, VERY_LOW_PRECISION)
                })

                it('the pitch on the even elements of the odd elements (layer 2 of 3) is scaled, by a factor increasing quadratically from 1/sieve to (almost, because it is not quite at the end) 1', (): void => {
                    const evenOddPitchScalars: number[] = evenElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenOddPitchScalars)
                        .toGoQuadraticallyFromValueToValue(1 / 2, 1, VERY_LOW_PRECISION)
                })

                it('the pitch on all other elements (odds of the odds, layer 3 of 3 AKA the non-layer) are at 2, the max, though it does not really matter because their intensities are at zero, but we think of this as like their resting place after having climbed this high I guess', (): void => {
                    const oddOddPitchScalars: number[] = oddElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(oddOddPitchScalars)
                        .toBeHomogenous(2)
                })
            })

            describe('sustain', (): void => {
                it('is the reciprocal of the sieve', (): void => {
                    const sustains: number[] = piece.map(
                        (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_ENVELOPE_IN_CONTOUR),
                    )

                    expect(sustains)
                        .toBeHomogenous(1 / 2)
                })
            })
        })

        describe('with 4 layers', (): void => {
            beforeEach((): void => {
                const specs: HafuhafuSpecs = {
                    ...initialSpecs,
                    existenceStyle,
                    layerCount: as.Cardinal<Layer[]>(4),
                    mode: HafuhafuMode.DROSTE,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(2),
                    sieveFractalRepetitions,
                    stretchPitch: true,
                }
                piece = computePiece(iterationKernel, specs)
            })

            it('has length equal to the sieve fractal repetitions times the sieve to the power of the layer count minus 1, plus one extra for realignment', (): void => {
                expect(computeLength(piece))
                    .toEqual(as.Cardinal<ContourPiece<PitchValueIntensityEnvelopeScale>>(801))
            })

            describe('value', (): void => {
                it('the value decreases quadratically from 1 to 1/sieve, just as it does in layer count 2', (): void => {
                    const values: number[] = piece.map(
                        (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_DURATION_IN_CONTOUR),
                    )

                    expect(values)
                        .toGoQuadraticallyFromValueToValue(1, 1 / 2, VERY_LOW_PRECISION)
                })
            })

            describe('intensity', (): void => {
                it('the intensity on the even elements (layer 1 of 4) decreases from 2/3 to almost 0', (): void => {
                    const evenIntensities: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(evenIntensities)
                        .toGoMonotonicallyFromValueToValue(2 / 3, 0, VERY_LOW_PRECISION)
                })

                it('the intensity on the even elements of the odd elements (layer 2 of 4) increases from 2/3 to 1 then back down to 2/3', (): void => {
                    const evenOddIntensities: number[] = evenElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    const ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER: number = 32
                    const firstHalfOfThose: number[] = slice(
                        evenOddIntensities,
                        INITIAL,
                        as.Ordinal(
                            (
                                evenOddIntensities.length -
                                ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER
                            ) / 2,
                        ),
                    )
                    const secondHalfOfThose: number[] = slice(
                        evenOddIntensities,
                        as.Ordinal(
                            (
                                evenOddIntensities.length -
                                ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER
                            ) / 2,
                        ),
                        indexOfFinalElement(evenOddIntensities),
                    )

                    expect(firstHalfOfThose)
                        .toGoMonotonicallyFromValueToValue(2 / 3, 1, VERY_LOW_PRECISION)
                    expect(secondHalfOfThose)
                        .toGoMonotonicallyFromValueToValue(1, 2 / 3, VERY_LOW_PRECISION)
                })

                it('the intensity on the even elements of the odd elements of the odd elements (layer 3 of 4) increases from 0 to almost 2/3', (): void => {
                    const evenOddOddIntensities: number[] = evenElements(oddElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(evenOddOddIntensities)
                        .toGoMonotonicallyFromValueToValue(0, 2 / 3, VERY_LOW_PRECISION)
                })

                it('the intensity on all other elements (odds of the odds of the odds, layer 4 of 4 AKA the non-layer) are at zero', (): void => {
                    const oddOddOddIntensities: number[] = oddElements(oddElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(oddOddOddIntensities)
                        .toBeHomogenous(0)
                })
            })

            describe('pitch index', (): void => {
                it('wraps around the kernel over and over, just the same as it is in layer count 2', (): void => {
                    forEach(
                        piece,
                        ([ pitchIndex, value, intensity, sustain, pitchScalar ]: ContourElement<PitchValueIntensityEnvelopeScale>, index: Ordinal<ContourPiece<PitchValueIntensityEnvelopeScale>>): void => {
                            expect(pitchIndex)
                                .toBe(iterationKernel[ as.number(index) % iterationKernel.length ])
                        },
                    )
                })
            })

            describe('pitch scalar', (): void => {
                it('the pitch on the even elements (layer 1 of 4) is scaled, by a factor increasing quadratically from 2^(1/2) to 2^(3/2) (which = 2 in the middle), because the first layer is the highest pitch, fastest one, about to fade out', (): void => {
                    const evenPitchScalars: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenPitchScalars)
                        .toGoQuadraticallyFromValueToValue(Math.pow(2, 1 / 2), Math.pow(2, 3 / 2), VERY_LOW_PRECISION)
                })

                it('the pitch on the even elements of the odd elements (layer 2 of 4) is scaled, by a factor increasing quadratically from 2^(-1/2) to 2^(1/2) (which = 1 in the middle)', (): void => {
                    const evenOddPitchScalars: number[] = evenElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenOddPitchScalars)
                        .toGoQuadraticallyFromValueToValue(Math.pow(2, -1 / 2), Math.pow(2, 1 / 2), VERY_LOW_PRECISION)
                })

                it('the pitch on the even elements of the odd elements of the odd elements (layer 3 of 4) is scaled, by a factor increasing quadratically from 2^(-3/2) to 2^(-1/2) (which = 1/2 in the middle)', (): void => {
                    const evenOddOddPitchScalars: number[] = evenElements(oddElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenOddOddPitchScalars)
                        .toGoQuadraticallyFromValueToValue(
                            Math.pow(2, -3 / 2),
                            Math.pow(2, -1 / 2),
                            VERY_LOW_PRECISION,
                        )
                })

                it('the pitch on all the remaining elements (the odds of the odds of the odds, layer 4 of 4 AKA the non-layer) is at 2^(3/2), the max, though it does not really matter because intensity is at zero, but I guess we think of this is as its final resting pitch having climbed this high haha', (): void => {
                    const oddOddOddPitchScalars: number[] = oddElements(oddElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(oddOddOddPitchScalars)
                        .toBeHomogenous(Math.pow(2, 3 / 2))
                })
            })
        })

        describe('when stretch pitch is false', (): void => {
            beforeEach((): void => {
                const specs: HafuhafuSpecs = {
                    ...initialSpecs,
                    existenceStyle,
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: false,
                    sieveFractalRepetitions,
                    stretchPitch: false,
                }
                piece = computePiece(iterationKernel, specs)
            })

            it('keeps a flat pitch scalar of 1', (): void => {
                const pitchScalars: number[] = piece
                    .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                expect(pitchScalars)
                    .toBeHomogenous(1)
            })
        })

        describe('when reverse is true', (): void => {
            beforeEach((): void => {
                const specs: HafuhafuSpecs = {
                    ...initialSpecs,
                    existenceStyle,
                    layerCount: as.Cardinal<Layer[]>(4),
                    mode: HafuhafuMode.DROSTE,
                    reverse: true,
                    sieveFractalRepetitions,
                    stretchPitch: true,
                }
                piece = computePiece(iterationKernel, specs)
            })

            describe('value', (): void => {
                it(
                    `the value increases from 1/sieve to 1, the opposite of what it does when not reverse - except there's a catch - \
the results are also cyclically translated by -1 so that the last element gets the value the first element would have; \
this is because when one reverses a set of notes, their original values are no longer in front of them, but behind them, \
so you have to give your value to the element behind you`,
                    (): void => {
                        const SHIFT_TO_FLIP_DURATION_ASSOCIATIONS_WHEN_REVERSE: Cardinal<Cycle> = as.Cardinal<Cycle>(1)
                        const values: number[] = as.unbrandedArray(use.Cardinal(
                            as.Cycle(piece.map(
                                (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_DURATION_IN_CONTOUR),
                            )),
                            SHIFT_TO_FLIP_DURATION_ASSOCIATIONS_WHEN_REVERSE,
                        ))

                        expect(values)
                            .toGoMonotonicallyFromValueToValue(1 / 2, 1, VERY_LOW_PRECISION)
                    },
                )
            })

            describe('pitch scalar - with stretch pitch true', (): void => {
                it('the pitch on the even elements (layer 1 of 4) is scaled, by a factor decreasing quadratically from 2^(3/2) to 2^(1/2) (which = 2 in the middle), because the first layer is the highest pitch, fastest one, when reversed, coming out of silence', (): void => {
                    const evenPitchScalars: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))
                    const evenPitchScalarsDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne: number[] = slice(evenPitchScalars, INITIAL, indexOfFinalElement(evenPitchScalars))
                    expect(evenPitchScalarsDroppingTheLastElementBecauseReverseDrosteMustCycleDurationsByOne)
                        .toGoQuadraticallyFromValueToValue(Math.pow(2, 3 / 2), Math.pow(2, 1 / 2), VERY_LOW_PRECISION)
                })

                it('the pitch on the odd elements of the odd elements (yes, layer 2 of 4, is odd of odd when reverse is true, turns out - try it yourself!) is scaled, by a factor decreasing quadratically from sqrt(2) to 1/sqrt(2) (which = 1 in the middle)', (): void => {
                    const evenOddPitchScalars: number[] = oddElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenOddPitchScalars)
                        .toGoQuadraticallyFromValueToValue(Math.pow(2, 1 / 2), Math.pow(2, -1 / 2), VERY_LOW_PRECISION)
                })

                it('the pitch on the odd elements of the even elements of the odd elements (layer 3 of 4, yes, odd of even of odd is layer 3 when reverse is true - try it yourself!) is scaled, by a factor decreasing quadratically from 2^(-1/2) to 2^(-3/2) (which = 1/2 in the middle)', (): void => {
                    const evenOddOddPitchScalars: number[] = oddElements(evenElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenOddOddPitchScalars)
                        .toGoQuadraticallyFromValueToValue(Math.pow(2, -1 / 2), Math.pow(2, -3 / 2), VERY_LOW_PRECISION)
                })

                it('the pitch is scaled on all the other elements to 2^(3/2), the max, because thats as high as they reached before going to intensity 0 silence (layer 4 of 4, AKA the non-layer, the evens of the evens of the odds)', (): void => {
                    const evenEvenOddPitchScalars: number[] = evenElements(evenElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(evenEvenOddPitchScalars)
                        .toBeHomogenous(Math.pow(2, 3 / 2))
                })
            })

            describe('intensity', (): void => {
                it('the intensity on the even elements (layer 1 of 4) increases from 0 to almost 2/3', (): void => {
                    const evenIntensities: number[] = evenElements(piece)
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(evenIntensities)
                        .toGoMonotonicallyFromValueToValue(0, 2 / 3, VERY_LOW_PRECISION)
                })

                it('the intensity on the odd elements of the odd elements (layer 2 of 4) increases from 2/3 to 1 then back down to 2/3 (same as when not reverse, as it is mirrored when layer count is odd, as this example i happened to pick is, so maybe i should actually get an even layer count example too... nah it is covered well enough by the intensity curve suite', (): void => {
                    const oddOddIntensities: number[] = oddElements(oddElements(piece))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    const ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER: number = 34
                    const firstHalfOfThose: number[] = slice(
                        oddOddIntensities,
                        INITIAL,
                        as.Ordinal(
                            (
                                oddOddIntensities.length +
                                ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER
                            ) / 2,
                        ),
                    )
                    const secondHalfOfThose: number[] = slice(
                        oddOddIntensities,
                        as.Ordinal(
                            (
                                oddOddIntensities.length +
                                ACTUALLY_WE_NEED_TO_DEFINE_HALFWAY_IN_TERMS_OF_THE_DURATION_PROGRESS_AND_SINCE_IT_IS_SPEEDING_UP_THERE_ARE_MORE_INDICES_ON_ONE_SIDE_THAN_OTHER
                            ) / 2,
                        ),
                        indexOfFinalElement(oddOddIntensities),
                    )

                    expect(firstHalfOfThose)
                        .toGoMonotonicallyFromValueToValue(2 / 3, 1, VERY_LOW_PRECISION)
                    expect(secondHalfOfThose)
                        .toGoMonotonicallyFromValueToValue(1, 2 / 3, VERY_LOW_PRECISION)
                })

                it('the intensity on the odd elements of the even elements of the odd elements (layer 3 of 4) decreases from 2/3 to almost 0', (): void => {
                    const oddEvenOddIntensities: number[] = oddElements(evenElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(oddEvenOddIntensities)
                        .toGoMonotonicallyFromValueToValue(2 / 3, 0, VERY_LOW_PRECISION)
                })

                it('the intensity on all other elements (evens of the evens of the odds, layer 4 of 4 AKA the non-layer) are at zero', (): void => {
                    const oddOddOddIntensities: number[] = evenElements(evenElements(oddElements(piece)))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                    expect(oddOddOddIntensities)
                        .toBeHomogenous(0)
                })
            })
        })

        describe('when sieve is greater than 2', (): void => {
            beforeEach((): void => {
                const specs: HafuhafuSpecs = {
                    ...initialSpecs,
                    existenceStyle,
                    layerCount: as.Cardinal<Layer[]>(3),
                    mode: HafuhafuMode.DROSTE,
                    reverse: false,
                    sieve: as.Multiple<LayerIndex>(3),
                    sieveFractalRepetitions,
                    stretchPitch: true,
                }
                piece = computePiece(iterationKernel, specs)
            })

            describe('pitch scalar', (): void => {
                it('the pitch on every 3rd element (layer 1 of 3) is scaled, by a factor increasing quadratically from 1 to 3, because the first layer is the highest pitch, fastest one, about to fade out', (): void => {
                    const layerOnePitchScalars: number[] = everyNthElement(piece, as.Multiple(3))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(layerOnePitchScalars)
                        .toGoQuadraticallyFromValueToValue(1, 3, VERY_LOW_PRECISION)
                })

                it('the pitch on layer 2 of 3 elements is scaled, by a factor increasing quadratically from 1/sieve to (almost, because it is not quite at the end) 1', (): void => {
                    const layerTwoPitchScalars: number[] = everyNthElement(piece, as.Multiple(9), as.Ordinal<ContourPiece<PitchValueIntensityEnvelopeScale>>(1))
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(layerTwoPitchScalars)
                        .toGoQuadraticallyFromValueToValue(1 / 3, 1, VERY_LOW_PRECISION)
                })
            })

            describe('value', (): void => {
                it('the value decreases quadratically from 1 to 1/sieve, which is here 1/3', (): void => {
                    const values: number[] = piece.map(
                        (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_DURATION_IN_CONTOUR),
                    )

                    expect(values)
                        .toGoQuadraticallyFromValueToValue(1, 1 / 3, VERY_LOW_PRECISION)
                })
            })

            describe('sustain', (): void => {
                it('is the reciprocal of the sieve', (): void => {
                    const sustains: number[] = piece.map(
                        (element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_ENVELOPE_IN_CONTOUR),
                    )

                    expect(sustains)
                        .toBeHomogenous(1 / 3)
                })
            })
        })
    })

    describe('zeno mode', (): void => {
        const KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH: Block = as.Block([ 1, 2, 1, 1, 2 ])

        describe('intensity', (): void => {
            let piece: ContourPiece<PitchValueIntensityEnvelopeScale>
            let layerOneElements: ContourPiece<PitchValueIntensityEnvelopeScale>
            let layerTwoElements: ContourPiece<PitchValueIntensityEnvelopeScale>
            let layerThreeElements: ContourPiece<PitchValueIntensityEnvelopeScale>
            beforeEach((): void => {
                const sieve: Sieve = as.Multiple<LayerIndex>(5)
                piece = computePiece(
                    as.Block([ 0, 1, 0, 0, 1 ]),
                    {
                        ...initialSpecs,
                        existenceStyle: ExistenceStyle.FADE,
                        layerCount: as.Cardinal<Layer[]>(3),
                        mode: HafuhafuMode.ZENO,
                        reverse: false,
                        sieve,
                        sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(20),
                        sourceKernel: as.Block([ 0, 1, 0, 0, 1 ]),
                    },
                )

                layerOneElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])
                layerTwoElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])
                layerThreeElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])

                forEach(piece, (element: ContourElement<PitchValueIntensityEnvelopeScale>, index: Ordinal<ContourPiece<PitchValueIntensityEnvelopeScale>>): void => {
                    if (dividesEvenly(index, sieve)) {
                        if (dividesEvenly(index, use.Power(sieve, as.Power<Sieve>(2)))) {
                            layerOneElements.push(element)
                        }
                        else {
                            layerTwoElements.push(element)
                        }
                    }
                    else {
                        layerThreeElements.push(element)
                    }
                })
            })

            it('for layer one, they should all stay at full intensity', (): void => {
                const layerOneIntensities: number[] = layerOneElements
                    .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                expect(layerOneIntensities)
                    .toBeHomogenous(1)
            })

            it('for layer two, they should decrease from 1 to 1/2', (): void => {
                const layerTwoIntensities: number[] = layerTwoElements
                    .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                expect(layerTwoIntensities)
                    .toGoMonotonicallyFromValueToValue(1, 1 / 2, VERY_LOW_PRECISION)
            })

            it('for layer three, they should decrease from 1/2 to 0', (): void => {
                const layerThreeIntensities: number[] = layerThreeElements
                    .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_GAIN_IN_CONTOUR))

                expect(layerThreeIntensities)
                    .toGoMonotonicallyFromValueToValue(1 / 2, 0, VERY_LOW_PRECISION)
            })
        })

        describe('value', (): void => {
            it(
                `the element progress is a "dumb" value, incrementing flatly; \
value though, needs to be changing by sieve times as much at the beginning of an iteration, \
because there are 1/sieve as many notes happening then - when sieve is 2`,
                (): void => {
                    const piece: ContourPiece<PitchValueIntensityEnvelopeScale> = computePiece(
                        KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        {
                            ...initialSpecs,
                            existenceStyle: ExistenceStyle.FADE,
                            mode: HafuhafuMode.ZENO,
                            reverse: false,
                            sieve: as.Multiple<LayerIndex>(2),
                            sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
                            sourceKernel: KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        },
                    )
                    const values: number[] = piece.map(
                        (kernelElement: ContourElement<PitchValueIntensityEnvelopeScale>): number =>
                            use.Ordinal(kernelElement, INDEX_OF_DURATION_IN_CONTOUR),
                    )

                    expect(values)
                        .toGoQuadraticallyFromValueToValue(1, 1 / 2, VERY_LOW_PRECISION)
                },
            )

            it(
                `the element progress is a "dumb" value, incrementing flatly; \
value though, needs to be changing by sieve times as much at the beginning of an iteration, \
because there are 1/sieve as many notes happening then - when sieve is 3`,
                (): void => {
                    const piece: ContourPiece<PitchValueIntensityEnvelopeScale> = computePiece(
                        KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        {
                            ...initialSpecs,
                            existenceStyle: ExistenceStyle.FADE,
                            mode: HafuhafuMode.ZENO,
                            reverse: false,
                            sieve: as.Multiple<LayerIndex>(3),
                            sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
                            sourceKernel: KERNEL_AND_OR_CYCLE_KERNEL_DOESNT_MATTER_HERE_AS_LONG_AS_SAME_LENGTH,
                        },
                    )
                    const values: number[] = piece.map(
                        (kernelElement: ContourElement<PitchValueIntensityEnvelopeScale>): number =>
                            use.Ordinal(kernelElement, INDEX_OF_DURATION_IN_CONTOUR),
                    )

                    expect(values)
                        .toGoQuadraticallyFromValueToValue(1, 1 / 3, VERY_LOW_PRECISION)
                },
            )
        })

        describe('pitch scalar', (): void => {
            describe('when stretch pitch is false', (): void => {
                it('all pitch scalars are 1', (): void => {
                    const sieve: Sieve = as.Multiple<LayerIndex>(5)
                    const piece: ContourPiece<PitchValueIntensityEnvelopeScale> = computePiece(
                        as.Block([ 0, 1, 0, 0, 1 ]),
                        {
                            ...initialSpecs,
                            existenceStyle: ExistenceStyle.FADE,
                            layerCount: as.Cardinal<Layer[]>(3),
                            mode: HafuhafuMode.ZENO,
                            reverse: false,
                            sieve,
                            sieveFractalRepetitions: as.Multiple<Cardinal<LayerIndex[]>>(4),
                            sourceKernel: as.Block([ 0, 1, 0, 0, 1 ]),
                            stretchPitch: false,
                        },
                    )

                    const iterationPitchScalars: number[] = piece
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(iterationPitchScalars)
                        .toBeHomogenous(1)
                })
            })

            describe('when stretch pitch is true', (): void => {
                let piece: ContourPiece<PitchValueIntensityEnvelopeScale>
                let layerOneElements: ContourPiece<PitchValueIntensityEnvelopeScale>
                let layerTwoElements: ContourPiece<PitchValueIntensityEnvelopeScale>
                let layerThreeElements: ContourPiece<PitchValueIntensityEnvelopeScale>
                beforeEach((): void => {
                    const sieve: Sieve = as.Multiple<LayerIndex>(5)
                    piece = computePiece(
                        as.Block([ 0, 1, 0, 0, 1 ]),
                        {
                            ...initialSpecs,
                            existenceStyle: ExistenceStyle.FADE,
                            layerCount: as.Cardinal<Layer[]>(3),
                            mode: HafuhafuMode.ZENO,
                            reverse: false,
                            sieve,
                            sieveFractalRepetitions: A_VERY_LARGE_NUMBER_OF_REPETITIONS_WHICH_IMPROVES_MY_ABILITY_TEST_GOING_FROM_ONE_VALUE_TO_ANOTHER_AS_THE_VALUES_I_CHECK_ARE_NOT_QUITE_AT_THE_BEGINNINGS_AND_ENDS_OF_THE_ARRAYS_SO_THE_HIGHER_THE_RESOLUTION_THE_MORE_ACCURATE,
                            sourceKernel: as.Block([ 0, 1, 0, 0, 1 ]),
                            stretchPitch: true,
                        },
                    )

                    layerOneElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])
                    layerTwoElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])
                    layerThreeElements = as.ContourPiece<PitchValueIntensityEnvelopeScale>([])

                    forEach(piece, (element: ContourElement<PitchValueIntensityEnvelopeScale>, index: Ordinal<ContourPiece<PitchValueIntensityEnvelopeScale>>): void => {
                        if (dividesEvenly(index, sieve)) {
                            if (dividesEvenly(index, use.Power(sieve, as.Power<Sieve>(2)))) {
                                layerOneElements.push(element)
                            }
                            else {
                                layerTwoElements.push(element)
                            }
                        }
                        else {
                            layerThreeElements.push(element)
                        }
                    })
                })

                it('for layer one, they should all stay flat at 1', (): void => {
                    const layerOnePitchScalars: number[] = layerOneElements
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    expect(layerOnePitchScalars)
                        .toBeHomogenous(1)
                })

                it('for layer two, they should increase from 1 to sieve', (): void => {
                    const layerTwoPitchScalars: number[] = layerTwoElements
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    // I would test that it goes quadratically, but because it's clusters of sampled elements instead of every single element, the utility will fail it.
                    // That's okay, though, because its quadratic change is covered by tests of the layers progress it is based on.
                    expect(layerTwoPitchScalars)
                        .toGoMonotonicallyFromValueToValue(
                            1,
                            5,
                            VERY_LOW_PRECISION,
                        )
                })

                it('for layer three, they should increase from sieve to sieve^2', (): void => {
                    const layerThreePitchScalars: number[] = layerThreeElements
                        .map((element: ContourElement<PitchValueIntensityEnvelopeScale>): number => use.Ordinal(element, INDEX_OF_PITCH_SCALAR_IN_CONTOUR))

                    // I would test that it goes quadratically, but because it's clusters of sampled elements instead of every single element, the utility will fail it.
                    // That's okay, though, because its quadratic change is covered by tests of the layers progress it is based on.
                    expect(layerThreePitchScalars)
                        .toGoMonotonicallyFromValueToValue(
                            5,
                            25,
                            VERY_LOW_PRECISION,
                        )
                })
            })
        })
    })
})
