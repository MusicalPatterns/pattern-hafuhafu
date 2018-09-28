import { Note } from '../../../src/types'
import { Scalar, Time } from '../../../src/utilities/nominalTypes'
import * as to from '../../../src/utilities/to'
import { hafuhafuNote } from './notes'
import { Rhythm } from './types'

const SPEED_ADJUST: number = 25
const TWO: number = 2
const ONE: number = 1
const ALMOST_ALL: number = 0.8
const FULL_GAIN: number = 1

const hafuhafuNotes: (rhythm: Rhythm, barCount: number) => Note[] =
    (rhythm: Rhythm, barCount: number): Note[] => {
        const rhythmLength: number = rhythm.length
        const output: Note[] = []

        for (let i: number = 0; i < rhythmLength * barCount; i++) {
            const progress: number = i / (rhythmLength * barCount)
            const gain: Scalar = i % TWO === 0 ? to.Scalar(FULL_GAIN) : to.Scalar(FULL_GAIN - progress)
            const duration: Time = to.Time(Math.pow(TWO, (ONE - progress)) * SPEED_ADJUST)
            const sustain: Time = to.Time(ALMOST_ALL * SPEED_ADJUST)

            output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain, to.Scalar(1)))
        }

        return output
    }

export {
    hafuhafuNotes,
}
