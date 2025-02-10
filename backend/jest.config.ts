import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  resetMocks: true,
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
    "^database/(.*)$": "<rootDir>/database/$1",
  },
};

export default config;
