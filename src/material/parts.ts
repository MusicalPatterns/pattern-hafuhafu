import { NoteSpec } from '@musical-patterns/compiler'
import { apply, Block, Cardinal, from, Ordinal, product, to } from '@musical-patterns/utilities'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from '../constants'
import {
    hafuhafuContourElement,
    HafuhafuContourElement,
    pitchCircularityInObjectStyleContourElement,
    pitchCircularityOutObjectStyleContourElement,
} from '../custom'
import { DeletionStyle, Direction } from '../types'
import { buildNoteSpec } from './notes'

const buildPart: (block: Block, iterationLength: Cardinal, deletionStyle: DeletionStyle) => NoteSpec[] =
    (block: Block, iterationLength: Cardinal, deletionStyle: DeletionStyle): NoteSpec[] => {
        const cellCount: Cardinal = to.Cardinal(block.length)
        const part: NoteSpec[] = []

        for (
            let partIndex: Ordinal = to.Ordinal(0);
            partIndex < to.Ordinal(from.Cardinal(product(cellCount, iterationLength)));
            partIndex = apply.Translation(partIndex, to.Translation(1))
        ) {
            const contourElement: HafuhafuContourElement = hafuhafuContourElement({
                block,
                cellCount,
                deletionStyle,
                iterationLength,
                partIndex,
            })
            part.push(buildNoteSpec(contourElement))
        }

        return part
    }

const buildHafuhafuWithPitchCircularityPart:
    (block: Block, iterationLength: Cardinal, direction: Direction, deletionStyle: DeletionStyle) => NoteSpec[] =
    (block: Block, iterationLength: Cardinal, direction: Direction, deletionStyle: DeletionStyle): NoteSpec[] => {
        const cellCount: Cardinal = to.Cardinal(block.length)
        const part: NoteSpec[] = []

        if (direction === Direction.IN) {
            const totalNotesCount: Cardinal = product(cellCount, iterationLength)
            for (
                let partIndex: Ordinal = to.Ordinal(0);
                partIndex < to.Ordinal(from.Cardinal(totalNotesCount));
                partIndex = apply.Translation(partIndex, to.Translation(1))
            ) {
                const contourElement: HafuhafuContourElement = pitchCircularityInObjectStyleContourElement({
                    block,
                    cellCount,
                    deletionStyle,
                    iterationLength: totalNotesCount,
                    partIndex,
                })
                part.push(buildNoteSpec(contourElement))
            }
        }
        else if (direction === Direction.OUT) {
            const totalNotesCount: Cardinal = apply.Scalar(
                product(cellCount, iterationLength),
                HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
            )
            for (
                let partIndex: Ordinal = to.Ordinal(0);
                partIndex < to.Ordinal(from.Cardinal(totalNotesCount));
                partIndex = apply.Translation(partIndex, to.Translation(1))
            ) {
                const contourElement: HafuhafuContourElement = pitchCircularityOutObjectStyleContourElement({
                    block,
                    cellCount,
                    deletionStyle,
                    iterationLength: totalNotesCount,
                    partIndex,
                })
                part.push(buildNoteSpec(contourElement))
            }
        }

        return part
    }

export {
    buildPart,
    buildHafuhafuWithPitchCircularityPart,
}
