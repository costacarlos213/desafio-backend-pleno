module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  rootDir: "src/",
  roots: [
    "<rootDir>"
  ],
  setupFiles: ['dotenv/config'],
  testEnvironment: "jest-environment-node",
};