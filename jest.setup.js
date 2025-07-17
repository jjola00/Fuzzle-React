// Jest setup file for React Native testing
import 'react-native-gesture-handler/jestSetup';

// Mock native modules
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  
  return Reanimated;
});

// Mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  NavigationContainer: ({ children }) => children,
}));

// Mock expo modules
jest.mock('expo-constants', () => ({
  default: {
    manifest: {},
  },
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock platform-specific modules
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: (objs) => objs.ios,
}));

// Global test setup
global.fetch = require('jest-fetch-mock');

// Console overrides for cleaner test output
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (message, ...args) => {
  // Suppress React Native warnings during tests
  if (
    typeof message === 'string' &&
    (message.includes('Warning: ReactDOM.render') ||
     message.includes('Warning: React.createElement'))
  ) {
    return;
  }
  originalConsoleError(message, ...args);
};

console.warn = (message, ...args) => {
  // Suppress specific React Native warnings
  if (
    typeof message === 'string' &&
    (message.includes('componentWillMount') ||
     message.includes('componentWillReceiveProps'))
  ) {
    return;
  }
  originalConsoleWarn(message, ...args);
}; 