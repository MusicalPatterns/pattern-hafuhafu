import { Rhythm } from './types'
import { Note } from '../../../src/types'
import { hafuhafuNote } from './notes'
import * as to from '../../../src/utilities/to'
import { Scalar, Time } from '../../../src/utilities/nominalTypes'

const SPEED_ADJUST: number = 50

const hafuhafu: (rhythm: Rhythm, barCount: number) => Note[] = (rhythm: Rhythm, barCount: number): Note[] => {
    const rhythmLength: number = rhythm.length
    const output: Note[] = []

    for (let i: number = 0; i < rhythmLength * barCount; i++) {
        const progress = i / (rhythmLength * barCount)
        const gain: Scalar = i % 2 === 0 ? to.Scalar(1) : to.Scalar(1 - progress)
        const duration: Time = to.Time((2 - progress) * SPEED_ADJUST)
        const sustain: Time = to.Time(0.8 * SPEED_ADJUST)

        output.push(hafuhafuNote(rhythm[i % rhythmLength], gain, duration, sustain))
    }

    return output
}

export {
    hafuhafu,
}
