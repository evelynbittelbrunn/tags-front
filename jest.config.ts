module.exports = {
    preset: 'ts-jest', // Use o preset do TypeScript
    testEnvironment: 'jsdom', // Ambiente de teste
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock de estilos
    },
    collectCoverage: true, // Ativa a coleta de cobertura
    coverageDirectory: 'coverage', // Diretório para relatórios de cobertura
    coverageReporters: ['lcov', 'text'], // Formatos dos relatórios de cobertura
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Transforma arquivos JS com Babel
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TS com ts-jest
    },
    transformIgnorePatterns: [
        '/node_modules/(?!antd|rc-.*|@ant-design).+\\.(js|jsx|ts|tsx)$',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-dom/extend-expect'], // Configurações pós-env
    testMatch: [
        '**/src/pages/**/?(*.)+(test|spec|Teste).[tj]s?(x)', // Padrão para encontrar arquivos de teste
    ],
    automock: false,
    setupFiles: ['<rootDir>/jest.setup.ts']
};
