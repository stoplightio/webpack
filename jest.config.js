module.exports = {
  preset: '@stoplight/scripts',
  moduleNameMapper: {
    '^uuid/v4$': '<rootDir>/src/__tests__/mocks/uuid-v4.js',
  },
};
