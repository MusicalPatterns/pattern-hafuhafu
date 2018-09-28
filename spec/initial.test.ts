// tslint:disable:no-any no-require-imports no-unsafe-any

import { fiveRhythm } from '../src/initial'

declare const require: any

describe('five rhythm', () => {
    it('is the minimum necessary base rhythm', () => {
        expect(fiveRhythm).toEqual([0, 1, 0, 0, 1])
    })
})
