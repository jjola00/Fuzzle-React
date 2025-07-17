// Jest setup file for React Native testing

// Setup jest matchers (now built into @testing-library/react-native v12.4+)
// No need to import extend-expect separately anymore

// Mock fetch for testing
global.fetch = require("jest-fetch-mock");
