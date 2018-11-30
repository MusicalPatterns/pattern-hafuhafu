import { compilePattern } from '@musical-patterns/compiler'
import { ThreadSpec } from '@musical-patterns/performer'
import { pattern } from '../../src/indexForTest'

// tslint:disable-next-line:no-any
declare const require: any

describe('snapshot', () => {
    it('stays locked down', async (done: DoneFn) => {
        // tslint:disable-next-line:no-require-imports no-unsafe-any
        const expectedSnapshot: ThreadSpec[] = require('../../dist/snapshot')

        const actualSnapshot: ThreadSpec[] = await compilePattern(pattern)

        expect(JSON.stringify(actualSnapshot, undefined, 2))
            .toEqual(JSON.stringify(expectedSnapshot, undefined, 2))

        done()
    })
})
