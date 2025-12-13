/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }]
  },

  extensionsToTreatAsEsm: [".ts"],

  // Map ONLY local runtime ".js" imports to ".ts"
  moduleNameMapper: {
    "^(\\.{1,2}/src/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/routes)\\.js$": "$1.ts",
    "^(\\.{1,2}/controllers/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/services/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/middleware/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/models/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/prisma)\\.js$": "$1.ts",
    "^(\\.{1,2}/validators/.*)\\.js$": "$1.ts",
    "^(\\.{1,2}/utils/.*)\\.js$": "$1.ts"
  },


  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transformIgnorePatterns: ["/node_modules/"]
};
