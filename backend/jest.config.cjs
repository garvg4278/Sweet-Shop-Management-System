/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",

  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  // 🔑 ONLY rewrite relative imports from YOUR src code
moduleNameMapper: {
  "^(\\.{1,2}/src/.*)\\.js$": "$1.ts",

  "^(\\.{1,2}/controllers/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/services/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/middleware/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/validators/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/utils/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/errors/.*)\\.js$": "$1.ts",
  "^(\\.{1,2}/prisma)\\.js$": "$1.ts",
  "^(\\.{1,2}/routes)\\.js$": "$1.ts",
},



  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },

  // 🔒 CRITICAL: never transform node_modules
  transformIgnorePatterns: [
    "/node_modules/",
  ],

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
