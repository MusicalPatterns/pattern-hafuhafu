import { NoteSpec } from '@musical-patterns/compiler'
import { apply, Block, Count, from, Index, to } from '@musical-patterns/utilities'
import { HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR } from '../constants'
import {
    hafuhafuContourElement,
    HafuhafuContourElement,
    pitchCircularityInObjectStyleContourElement,
    pitchCircularityOutObjectStyleContourElement,
} from '../custom'
import { DeletionStyle, Direction } from '../types'
import { buildNoteSpec } from './notes'

const buildPart: (block: Block, iterationLength: Count, deletionStyle: DeletionStyle) => NoteSpec[] =
    (block: Block, iterationLength: Count, deletionStyle: DeletionStyle): NoteSpec[] => {
        const cellCount: Count = to.Count(block.length)
        const part: NoteSpec[] = []

        for (
            let partIndex: Index = to.Index(0);
            partIndex < to.Index(from.Count(cellCount) * from.Count(iterationLength));
            partIndex = apply.Offset(partIndex, to.Offset(1))
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
    (block: Block, iterationLength: Count, direction: Direction, deletionStyle: DeletionStyle) => NoteSpec[] =
    (block: Block, iterationLength: Count, direction: Direction, deletionStyle: DeletionStyle): NoteSpec[] => {
        const cellCount: Count = to.Count(block.length)
        const part: NoteSpec[] = []

        if (direction === Direction.IN) {
            const totalNotesCount: Count = to.Count(from.Count(cellCount) * from.Count(iterationLength))
            for (
                let partIndex: Index = to.Index(0);
                partIndex < to.Index(from.Count(totalNotesCount));
                partIndex = apply.Offset(partIndex, to.Offset(1))
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
            const totalNotesCount: Count = to.Count(apply.Scalar(
                from.Count(cellCount) * from.Count(iterationLength),
                HAFUHAFU_WITH_PITCH_CIRCULARITY_SCALAR,
            ))
            for (
                let partIndex: Index = to.Index(0);
                partIndex < to.Index(from.Count(totalNotesCount));
                partIndex = apply.Offset(partIndex, to.Offset(1))
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
