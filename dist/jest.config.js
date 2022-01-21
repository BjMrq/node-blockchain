"use strict";
module.exports = {
    clearMocks: true,
    coverageDirectory: '../coverage',
    resetMocks: true,
    resetModules: true,
    rootDir: '__tests__',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '.*/__tests__/.*.utils.ts'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    transformIgnorePatterns: []
};
//# sourceMappingURL=jest.config.js.map