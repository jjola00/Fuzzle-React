# Fuzzle React Native App

[![CI/CD Pipeline](https://github.com/your-username/fuzzle-react/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/fuzzle-react/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/your-username/fuzzle-react/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/fuzzle-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern React Native mobile application built with TypeScript, following best practices and clean architecture principles.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- EAS CLI (for builds and deployments)
- React Native development environment

### Quick Setup

1. Clone the repository

```bash
git clone <repository-url>
cd Fuzzle-React
```

2. Run the setup script

```bash
chmod +x scripts/setup-ci.sh
./scripts/setup-ci.sh
```

3. Configure your environment

```bash
# Copy and fill in your environment variables
cp .env.example .env
```

4. Start the development server

```bash
npm start
```

## 🏗️ CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with:

### ✅ Automated Quality Checks
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and style enforcement
- **Prettier**: Consistent code formatting
- **Tests**: Unit tests with coverage reporting
- **Security**: Dependency vulnerability scanning

### 🔨 Automated Building
- **Preview Builds**: For pull requests
- **Production Builds**: For releases
- **Multiple Platforms**: iOS and Android support
- **EAS Integration**: Managed build process

### 🚀 Automated Deployment
- **App Store**: Automated iOS submissions
- **Play Store**: Automated Android submissions
- **OTA Updates**: Over-the-air updates for quick fixes
- **Manual Deployment**: Workflow dispatch for releases

### 📊 Monitoring
- **Coverage Reports**: Code coverage tracking
- **Build Status**: Real-time build monitoring
- **Slack Notifications**: Team notifications
- **Security Alerts**: Automated vulnerability reports

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Common components (Button, Input, etc.)
│   └── __tests__/   # Component tests
├── contexts/        # React contexts for shared state
│   └── ThemeContext.tsx
├── hooks/           # Custom React hooks
│   ├── useAsyncState.ts
│   └── __tests__/   # Hook tests
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

```bash
# Development
npm start             # Start Expo development server
npm run android       # Run on Android device/emulator
npm run ios          # Run on iOS device/simulator
npm run web          # Run in web browser

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking

# Testing
npm test            # Run tests once
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Building & Deployment
npm run build:ios      # Build iOS app
npm run build:android  # Build Android app
npm run build:all      # Build both platforms
npm run submit:ios     # Submit to App Store
npm run submit:android # Submit to Play Store
npm run update         # Publish OTA update
```

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

The project includes comprehensive testing with:

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Type-safe test utilities**: TypeScript support
- **Coverage reporting**: Code coverage tracking
- **Automated testing**: CI/CD integration

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📱 Deployment

### Development Workflow

1. Create feature branch from `develop`
2. Make changes and push
3. Create PR to `develop`
4. CI runs tests and builds preview
5. Merge PR after approval
6. `develop` branch triggers OTA update

### Production Workflow

1. Create PR from `develop` to `main`
2. CI runs full test suite
3. Merge PR after approval
4. `main` branch triggers production build
5. Manual deployment to app stores

### Manual Deployment

Use GitHub Actions workflow dispatch:
1. Go to Actions tab in GitHub
2. Select "Deploy to App Stores"
3. Choose platform and track
4. Run workflow

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Expo Configuration
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your-api-key-here
EXPO_PUBLIC_ENVIRONMENT=development

# EAS Configuration
EXPO_TOKEN=your-expo-token-here
```

### GitHub Secrets

Set up these secrets in your repository:

- `EXPO_TOKEN`: Expo authentication token
- `APPLE_ID`: Apple Developer account email
- `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password
- `APPLE_TEAM_ID`: Apple Developer Team ID
- `ANDROID_SERVICE_ACCOUNT_KEY_BASE64`: Base64 encoded service account key
- `SLACK_WEBHOOK_URL`: Slack notifications (optional)

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

## 🔒 Security

### Security Measures

- **Dependency Scanning**: Regular vulnerability checks
- **Secret Management**: Secure credential handling
- **Code Analysis**: Static code analysis
- **Access Control**: Minimal permission principles

### Best Practices

- Keep dependencies updated
- Use environment variables for sensitive data
- Implement proper error handling
- Follow security guidelines for mobile apps

## 🔧 Development Tools

- **VS Code**: Recommended editor with TypeScript support
- **Expo**: Development platform for React Native
- **EAS**: Build and deployment service
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

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the test suite
6. Submit a pull request

## 📖 Documentation

- **[CI/CD Setup Guide](./CI_CD_SETUP.md)**: Detailed CI/CD configuration
- **[Project Requirements](./ProjectRequirements.txt)**: Technical requirements
- **[Comment Guidelines](./CommentRequirements.txt)**: Code commenting standards

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check EAS dashboard for logs
2. **Test Failures**: Verify mock configurations
3. **Linting Errors**: Run `npm run lint:fix`
4. **Type Errors**: Run `npm run type-check`

### Getting Help

- Check the troubleshooting section in `CI_CD_SETUP.md`
- Review GitHub Actions logs
- Create an issue for bug reports
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [React Native](https://reactnative.dev/)
- CI/CD with [GitHub Actions](https://github.com/features/actions)
- Testing with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/)

---

**Happy coding! 🚀**
