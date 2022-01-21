module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/domain/**/*.ts",
  ],

  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
