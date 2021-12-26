module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  rootDir: "src/",
  moduleNameMapper: {
    "@entities/(.*)$": "<rootDir>/entities/$1",
    "@repositories/(.*)$": "<rootDir>/repositories/$1",
    "@useCases/(.*)$": "<rootDir>/useCases/$1",
    "@controllers/(.*)$": "<rootDir>/controllers/$1",
  },
  roots: [
    "<rootDir>"
  ],
  setupFiles: ['dotenv/config'],
  testEnvironment: "jest-environment-node",
};