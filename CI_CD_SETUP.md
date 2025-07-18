# CI/CD Pipeline Setup Guide

This document explains how to set up and configure the CI/CD pipeline for the Fuzzle React Native app.

## Overview

The CI/CD pipeline consists of:

- **Code Quality Checks**: Linting, formatting, type checking
- **Testing**: Unit tests with coverage reporting
- **Security Scanning**: Dependency auditing and vulnerability scanning
- **Building**: Automated builds for iOS and Android
- **Deployment**: App store submissions and OTA updates

## Required Secrets

Add these secrets to your GitHub repository settings:

### Expo/EAS Secrets

- `EXPO_TOKEN`: Your Expo authentication token
  - Get from: https://expo.dev/settings/access-tokens

### Apple Developer Secrets

- `APPLE_ID`: Your Apple Developer account email
- `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password for your Apple ID
- `APPLE_TEAM_ID`: Your Apple Developer Team ID

### Google Play Secrets

- `ANDROID_SERVICE_ACCOUNT_KEY_BASE64`: Base64 encoded service account key
  - Create service account in Google Cloud Console
  - Download JSON key file
  - Encode to base64: `base64 -i service-account-key.json`

### Optional Secrets

- `SLACK_WEBHOOK_URL`: For deployment notifications
- `CODECOV_TOKEN`: For code coverage reporting
- `SENTRY_AUTH_TOKEN`: For error tracking integration

## Workflow Files

### `.github/workflows/ci.yml`

Main CI workflow that runs on:

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop`

**Jobs:**

1. `code-quality`: Linting, formatting, type checking, testing
2. `security-scan`: Dependency auditing and vulnerability scanning
3. `build-preview`: Builds preview versions for PRs
4. `build-production`: Builds production versions for main branch

### `.github/workflows/deploy.yml`

Deployment workflow that handles:

- Manual deployments via workflow dispatch
- Automatic deployments on releases
- OTA updates for develop branch

**Jobs:**

1. `deploy-ios`: Submits iOS build to App Store
2. `deploy-android`: Submits Android build to Play Store
3. `deploy-updates`: Publishes OTA updates

## EAS Configuration

### `eas.json`

Defines build profiles:

- `development`: Development client builds
- `preview`: Internal testing builds
- `production`: App store builds

### Build Profiles

```json
{
  "build": {
    "production": {
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

## Testing Setup

### Jest Configuration

- Uses `jest-expo` preset
- Configured for React Native testing
- Coverage reporting enabled
- Path aliases supported (`@/` → `src/`)

### Testing Libraries

- `@testing-library/react-native`: Component testing
- `@testing-library/jest-native`: Custom matchers
- `react-test-renderer`: React component rendering

### Running Tests

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Expo Configuration
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your-api-key-here
EXPO_PUBLIC_ENVIRONMENT=development

# EAS Configuration
EXPO_TOKEN=your-expo-token-here
```

## Branch Strategy

### Main Branch (`main`)

- Production-ready code
- Triggers production builds
- Deploys to app stores (manual)

### Development Branch (`develop`)

- Development code
- Triggers OTA updates
- Used for internal testing

### Feature Branches

- Create from `develop`
- Merge back to `develop` via PR
- Triggers preview builds

## Deployment Process

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
3. Choose platform (iOS/Android/All)
4. Choose track (production/beta/alpha)
5. Run workflow

## Code Quality

### ESLint Configuration

- TypeScript support
- React hooks rules
- React Native specific rules
- Prettier integration

### Prettier Configuration

- Automatic code formatting
- Consistent style across team
- Integrated with ESLint

### TypeScript Configuration

- Strict mode enabled
- Path aliases configured
- Type checking in CI

## Security

### Dependency Scanning

- `npm audit` for known vulnerabilities
- Trivy scanner for additional security checks
- Results uploaded to GitHub Security tab

### Best Practices

- Secrets stored in GitHub repository settings
- Service account keys encoded in base64
- Temporary files cleaned up after use
- Access tokens with minimal required permissions

## Monitoring and Notifications

### Slack Integration

- Build status notifications
- Deployment confirmations
- Failure alerts

### Coverage Reporting

- Codecov integration
- Coverage badges in README
- Coverage trends tracking

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check EAS dashboard for detailed logs
   - Verify all secrets are correctly configured
   - Ensure dependencies are up to date

2. **Test Failures**
   - Run tests locally first
   - Check for missing test dependencies
   - Verify mock configurations

3. **Deployment Issues**
   - Verify Apple Developer account settings
   - Check Google Play Console permissions
   - Ensure certificates are valid

### Getting Help

- Check EAS documentation: https://docs.expo.dev/eas/
- Review GitHub Actions logs
- Contact team lead for access issues

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and rotate secrets quarterly
- Monitor build times and optimize
- Update documentation as needed

### Dependency Updates

```bash
npm outdated          # Check for outdated packages
npm update           # Update packages
npx expo install --fix # Fix Expo SDK compatibility
```

## Performance Optimization

### Build Optimization

- Use appropriate resource classes
- Cache dependencies
- Minimize build artifacts
- Parallel job execution

### Test Optimization

- Use test parallelization
- Mock external dependencies
- Optimize test setup/teardown
- Focus on critical path testing

## Security Considerations

### Secret Management

- Use GitHub secrets for sensitive data
- Rotate secrets regularly
- Audit access permissions
- Monitor secret usage

### Build Security

- Scan for vulnerabilities
- Validate dependencies
- Use trusted base images
- Implement supply chain security

This pipeline provides a robust foundation for mobile app development with automated testing, building, and deployment capabilities.
