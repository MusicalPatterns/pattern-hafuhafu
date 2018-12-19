const config = require('../../../test/jasmine')

module.exports = {
    ...config,
    spec_files: [
        "test/src/**/*.ts",
        "test/src/**/*.js",
        "test/src/**/*.tsx",
        "test/src/**/*.jsx",
        'src/hafuhafu/test/src/**/*.ts',
        'src/hafuhafu/test/src/**/*.js',
        'src/hafuhafu/test/src/**/*.tsx',
        'src/hafuhafu/test/src/**/*.jsx',
    ],
}
