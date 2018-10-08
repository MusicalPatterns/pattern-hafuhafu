import { Dispatch } from 'redux'
import { DECIMAL } from '../../../src/constants'
import { ActionType } from '../../../src/interface/actions'
import { Config, Song } from '../../../src/songTypes'
import * as to from '../../hafuhafu/src/utilities/to'
import { Rhythm } from './types'

const hafuhafuHandleConfigChange: (dispatch: Dispatch, configKey: string, configValue: string, song: Song) => void =
    (dispatch: Dispatch, configKey: string, configValue: string, song: Song): void => {
        let configChanges: {[index: string]: number | Rhythm} = {}
        if (configKey === 'rhythm') {
            const newRhythm: Rhythm = to.Rhythm(JSON.parse(configValue) as number[])
            configChanges = { rhythm: newRhythm }
        }
        else {
            configChanges = { [configKey]: parseInt(configValue, DECIMAL) }
        }

        const updatedConfig: Config = { ...song.config, ...configChanges }
        const newSong: Song = { ...song, config: updatedConfig }

        dispatch({ type: ActionType.SET_SONG, data: newSong })
    }

export {
    hafuhafuHandleConfigChange,
}
