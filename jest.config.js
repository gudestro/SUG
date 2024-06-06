module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/api/docs/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/presentation/**/*.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts'
  ],
  testPathIgnorePatterns: ['src/presentation'],
  testTimeout: 60000,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
