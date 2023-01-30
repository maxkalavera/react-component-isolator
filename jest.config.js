/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFiles: [
    //'@testing-library/react/dont-cleanup-after-each',
  ],
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup-tests.tsx",
    "@testing-library/jest-dom/extend-expect",
  ],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "src/(.*)": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules"],
  coveragePathIgnorePatterns: ["/node_modules/", "/example_project"],
  testMatch: ["**/tests/**/*.test.ts?(x)"],
  globals: {
    viewportSizes: [{ width: 800, height: 600 }],
  },
};
