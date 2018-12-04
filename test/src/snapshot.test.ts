import { compilePattern } from '@musical-patterns/compiler'
import { pattern } from '../../src/indexForTest'

// tslint:disable-next-line:no-any
declare const require: any

describe('snapshot', () => {
    it('stays locked down', async (done: DoneFn) => {
        expect(JSON.stringify(await compilePattern(pattern), undefined, 2))
        // tslint:disable-next-line:no-require-imports no-unsafe-any
            .toEqual(JSON.stringify(require('../../package/snapshot'), undefined, 2))

        done()
    })
})
