import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { buildStandardScales, StandardSpecProperties } from '@musical-patterns/pattern'
import { from, NO_TRANSLATION, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'
import { buildScalars } from './scalars'

const buildScales: BuildScalesFunction =
    (spec: HafuhafuSpec): Scale[] => {
        const { nonScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            scalar: to.Scalar(from.Milliseconds(spec[ StandardSpecProperties.BASE_DURATION ] || to.Milliseconds(1))),
            scalars: nonScale.scalars,
            translation: spec[ StandardSpecProperties.DURATION_TRANSLATION ] || NO_TRANSLATION,
        }
        const pitchesScale: Scale = {
            scalar: to.Scalar(from.Frequency(spec[ StandardSpecProperties.BASE_FREQUENCY ] || to.Frequency(1))),
            scalars: buildScalars(spec),
            translation: spec[ StandardSpecProperties.FREQUENCY_TRANSLATION ] || NO_TRANSLATION,
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
