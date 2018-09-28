import { Note } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Scalar, Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { hafuhafuNote } from './notes'
import { Direction, Rhythm } from './types'

const SPEED_ADJUST: number = 25
const TWO: number = 2
const ONE: number = 1
const HALF: number = 0.5

const hafuhafuNotesWithPitchCircularity: (rhythm: Rhythm, barCount: number, direction: Direction) => Note[] =
    (rhythm: Rhythm, barCount: number, direction: Direction): Note[] => {
        const rhythmLength: number = rhythm.length
        const output: Note[] = []

        for (let i: number = 0; i < rhythmLength * barCount; i++) {
            const progress: number = i / (rhythmLength * barCount)

            if (direction === Direction.IN) {
                const gain: Scalar = to.Scalar(progress)
                const duration: Time = to.Time((TWO - progress) * SPEED_ADJUST)
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar((progress / TWO) + HALF)

                output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain, pitchScalar))
            } else {
                const gain: Scalar = to.Scalar(1 - progress)
                const duration: Time = to.Time((TWO - progress) * SPEED_ADJUST / TWO)
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar(ONE + progress)

                output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain, pitchScalar))
            }
        }

        return output
    }

export {
    hafuhafuNotesWithPitchCircularity,
}
