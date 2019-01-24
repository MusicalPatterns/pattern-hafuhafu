import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { buildStandardScales, StandardSpecProperties } from '@musical-patterns/pattern'
import { from, to } from '@musical-patterns/utilities'
import { HafuhafuSpec } from '../types'

const buildScales: BuildScalesFunction =
    (spec: HafuhafuSpec): Scale[] => {
        const { nonScale, octaveSeriesScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            offset: spec[ StandardSpecProperties.DURATION_OFFSET ] || to.Offset(0),
            scalar: to.Scalar(from.Millisecond(spec[ StandardSpecProperties.BASE_DURATION ] || to.Millisecond(1))),
            scalars: nonScale.scalars,
        }
        const pitchesScale: Scale = {
            offset: spec[ StandardSpecProperties.FREQUENCY_OFFSET ] || to.Offset(0),
            scalar: to.Scalar(from.Frequency(spec[ StandardSpecProperties.BASE_FREQUENCY ] || to.Frequency(1))),
            scalars: octaveSeriesScale.scalars,
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
