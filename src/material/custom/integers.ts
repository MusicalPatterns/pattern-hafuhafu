import { Integer, to } from '@musical-patterns/utilities'
import { A_MUCH_MORE_SUFFICIENT_COUNT_OF_NUMBERS_GODDAMNIT } from './constants'

const zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities: Integer[] = [
    ...Array(A_MUCH_MORE_SUFFICIENT_COUNT_OF_NUMBERS_GODDAMNIT)
        .keys(),
].map(to.Integer)

export {
    zeroAndPositiveIntegersButMoreOfThemThanYouGetFromUtilities,
}
