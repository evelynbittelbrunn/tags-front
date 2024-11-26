module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: [
        '**/src/pages/**/?(*.)+(test|spec|Teste).[tj]s?(x)',
    ],
};