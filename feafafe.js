module.exports = {
    "jest": {
        "verbose": true,
        "testRegex": "/tests/.*.test.(ts|js)$",
        moduleFileExtensions: ['ts', 'js', 'json', 'node'],
        "roots": [
            "<rootDir>/src",
            "<rootDir>/tests"
        ],
        "transform": {
            "^.+\\.tsx?$": "ts-jest"
        },
        "collectCoverage": true,
        "collectCoverageFrom": ["./src/**/*.{ts,js}"],
        "coverageDirectory": "./coverage"
    },
}