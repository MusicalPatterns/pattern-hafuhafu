const withinLength: (n: number, within: number) => number =
    (n: number, within: number): number => {
        let newN: number = n

        while (newN < 0) {
            newN += within
        }
        while (newN >= within) {
            newN -= within
        }

        return newN
    }

const rotate: <T>(array: T[], offset: number) => T[] =
    <T>(array: T[], offset: number): T[] => {
        const output: T[] = []
        const length: number = array.length

        for (let i: number = 0; i < length; i++) {
            let index: number = i - offset
            index = withinLength(index, length)
            output.push(array[index])
        }

        return output
    }

export {
    rotate,
}
