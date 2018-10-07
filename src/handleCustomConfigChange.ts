import { CustomConfig } from '../../../src/songTypes'
import * as to from '../../hafuhafu/src/utilities/to'
import { Rhythm } from './types'

const hafuhafuHandleCustomConfigChange: (customConfigKey: string, customConfigValue: string) => Partial<CustomConfig> =
    (customConfigKey: string, customConfigValue: string): Partial<CustomConfig> => {
        const newRhythm: Rhythm = to.Rhythm(JSON.parse(customConfigValue) as number[])

        return {
            rhythm: newRhythm,
        }
    }

export {
    hafuhafuHandleCustomConfigChange,
}
