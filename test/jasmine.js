const config = require('../../../test/jasmine')
const path = require('path')

const pattern = path.dirname(__dirname).split(path.sep).pop()

module.exports = {
    ...config,
    spec_files: [
        "test/src/**/*.ts",
        "test/src/**/*.js",
        "test/src/**/*.tsx",
        "test/src/**/*.jsx",
        `src/${pattern}/test/src/**/*.ts`,
        `src/${pattern}/test/src/**/*.js`,
        `src/${pattern}/test/src/**/*.tsx`,
        `src/${pattern}/test/src/**/*.jsx`,
    ],
}
