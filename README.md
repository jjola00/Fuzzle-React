# Fuzzle React Native App

A modern React Native mobile application built with TypeScript, following best practices and clean architecture principles.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Fuzzle
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Common components (Button, Input, etc.)
│   └── index.ts     # Component exports
├── contexts/        # React contexts for shared state
│   └── ThemeContext.tsx
├── hooks/           # Custom React hooks
│   └── useAsyncState.ts
├── pages/           # Screen components
│   └── HomeScreen.tsx
├── types/           # TypeScript type definitions
│   └── index.ts
├── utils/           # Utility functions and constants
│   └── theme.ts
└── App.tsx          # Main app component
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Code Standards

#### TypeScript Configuration

- Strict mode enabled with `strict: true`
- `noImplicitAny: true` for explicit type annotations
- `strictNullChecks: true` for null safety
- Path aliases configured for clean imports (`@/` points to `src/`)

#### ESLint & Prettier

- Consistent code formatting with Prettier
- TypeScript-specific ESLint rules
- React Hooks linting rules
- React Native specific linting

#### Component Guidelines

- Functional components with hooks (no classes)
- Single Responsibility Principle
- Proper TypeScript interfaces for props
- Accessibility attributes (ARIA)
- Semantic HTML elements where applicable

#### State Management

- Local state with `useState`
- Side effects with `useEffect`
- Custom hooks for reusable logic
- Context for shared, infrequently-changing data
- Immutable state updates

## 🎨 Design System

### Theme

- Light and dark mode support
- Consistent color palette
- Standardized spacing system
- Responsive design principles

### Components

- Reusable UI components
- Variant-based styling
- Accessibility-first approach
- TypeScript prop validation

## 🧪 Testing

The project is configured for testing with:

- Jest for unit testing
- React Testing Library for component testing
- Type-safe test utilities

## 📚 Architecture Principles

### React Patterns

- **Composition over Inheritance**: Components composed using props and children
- **One-way Data Flow**: Props flow down, events flow up
- **Lift State Up**: Shared state managed at appropriate component level
- **Minimal State**: Keep state minimal and derive the rest

### TypeScript Best Practices

- **Interface/Type Definitions**: Clear contracts for components and functions
- **Generics**: Reusable components and hooks with type safety
- **Utility Types**: `Partial`, `Pick`, `Omit` for type transformations
- **Discriminated Unions**: Type-safe variant handling

### Code Quality

- **Meaningful Comments**: Explain why, not what
- **Self-documenting Code**: Clear naming and structure
- **Error Boundaries**: Graceful error handling
- **Performance Optimization**: Lazy loading and memoization

## 🔧 Development Tools

- **VS Code**: Recommended editor with TypeScript support
- **Expo**: Development platform for React Native
- **Metro**: JavaScript bundler for React Native
- **Flipper**: Mobile app debugging platform

## 📱 Platform Support

- iOS (latest versions)
- Android (API level 21+)
- Web (development/testing)

## 🤝 Contributing

1. Follow the established code style
2. Add TypeScript types for new features
3. Include tests for new functionality
4. Update documentation as needed
5. Follow commit message conventions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
