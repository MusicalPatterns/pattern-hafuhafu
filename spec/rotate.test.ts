import { rotate } from '../src/rotate'

describe('rotate', () => {
    it('rotates a cycle', () => {
        expect(rotate([0, 1, 1, 0, 1], -1)).toEqual([1, 1, 0, 1, 0])
        expect(rotate([0, 1, 1, 0, 1], 0)).toEqual([0, 1, 1, 0, 1])
        expect(rotate([0, 1, 1, 0, 1], 1)).toEqual([1, 0, 1, 1, 0])
    })
})
