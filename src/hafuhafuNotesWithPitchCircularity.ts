import { Note } from '../../../src/types'
import * as from from '../../../src/utilities/from'
import { Scalar, Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { hafuhafuNote } from './notes'
import { Direction, Rhythm } from './types'

const SPEED_ADJUST: number = 50
const TWO: number = 2

const hafuhafuNotesWithPitchCircularity: (rhythm: Rhythm, barCount: number, direction: Direction) => Note[] =
    (rhythm: Rhythm, barCount: number, direction: Direction): Note[] => {
        const rhythmLength: number = rhythm.length
        const output: Note[] = []

        if (direction === Direction.IN) {
            const totalCells: number = rhythmLength * barCount
            for (let i: number = 0; i < totalCells; i++) {
                const progress: number = i / totalCells

                const gain: Scalar = to.Scalar(progress)
                const duration: Time = to.Time(Math.pow(TWO, 1 - progress) * SPEED_ADJUST)
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar(Math.pow(TWO, progress - 1))

                output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain, pitchScalar))

            }
        } else if (direction === Direction.OUT) {
            const totalCells: number = rhythmLength * barCount * TWO
            for (let i: number = 0; i < totalCells; i++) {
                const progress: number = i / totalCells

                const gain: Scalar = to.Scalar(1 - progress)
                const duration: Time = to.Time(Math.pow(TWO, -progress) * SPEED_ADJUST)
                const sustain: Time = to.Time(from.Time(duration) / TWO)
                const pitchScalar: Scalar = to.Scalar(Math.pow(TWO, progress))

                output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain, pitchScalar))
            }
        }

        return output
    }

export {
    hafuhafuNotesWithPitchCircularity,
}
