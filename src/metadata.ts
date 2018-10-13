import { SongID, SongMetadata } from '../../../src/songTypes'

const hafuhafuSongMetadata: SongMetadata = {
    description: 'rhythmic circularity; rhythms within themselves',
    formattedName: 'Hafuhafu',
    songId: SongID.HAFUHAFU,
}

const hafuhafuWithPitchCircularitySongMetadata: SongMetadata = {
    description: 'rhythmic circularity with extraneous and slipshod pitch circularity',
    formattedName: 'Hafuhafu (with pitch circularity)',
    songId: SongID.HAFUHAFU_WITH_PITCH_CIRCULARITY,
}

export {
    hafuhafuSongMetadata,
    hafuhafuWithPitchCircularitySongMetadata,
}
