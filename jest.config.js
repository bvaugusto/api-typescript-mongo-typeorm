module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ["src/**/*.{ts,js}", "!<rootDir>/src/endpoints/**/*.{ts,js}"],
};
