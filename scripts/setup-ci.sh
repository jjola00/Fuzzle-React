#!/bin/bash

# CI/CD Setup Script for Fuzzle React Native App
# This script helps set up the necessary tools and dependencies for CI/CD

set -e

echo "🚀 Setting up CI/CD environment for Fuzzle React Native App"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to fix npm global permissions
fix_npm_permissions() {
    echo -e "${YELLOW}🔧 Fixing npm global permissions...${NC}"
    
    # Create npm global directory if it doesn't exist
    mkdir -p $HOME/.npm-global
    mkdir -p $HOME/.npm-global/lib
    mkdir -p $HOME/.npm-global/bin
    
    # Set npm prefix to user directory
    npm config set prefix "$HOME/.npm-global"
    
    # Add to PATH if not already there
    if ! grep -q "$HOME/.npm-global/bin" ~/.bashrc; then
        echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> ~/.bashrc
    fi
    
    # Export for current session
    export PATH=$HOME/.npm-global/bin:$PATH
    
    echo -e "${GREEN}✅ npm permissions configured${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $NODE_VERSION is installed${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm is installed${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Fix npm permissions before installing global packages
fix_npm_permissions

# Install global dependencies with fallback to npx
echo -e "${YELLOW}🌐 Installing global dependencies...${NC}"

# Try to install globally, if it fails, we'll use npx
if npm install -g @expo/cli@latest eas-cli@latest 2>/dev/null; then
    echo -e "${GREEN}✅ Global packages installed successfully${NC}"
else
    echo -e "${YELLOW}⚠️ Global installation failed, will use npx for commands${NC}"
    
    # Test if npx can run expo and eas
    if npx @expo/cli@latest --version &>/dev/null; then
        echo -e "${GREEN}✅ Expo CLI available via npx${NC}"
    else
        echo -e "${RED}❌ Cannot access Expo CLI${NC}"
        exit 1
    fi
    
    if npx eas-cli --version &>/dev/null; then
        echo -e "${GREEN}✅ EAS CLI available via npx${NC}"
    else
        echo -e "${RED}❌ Cannot access EAS CLI${NC}"
        exit 1
    fi
fi

# Check if EAS CLI is accessible
if command -v eas &> /dev/null; then
    echo -e "${GREEN}✅ EAS CLI is installed globally${NC}"
elif npx eas-cli --version &>/dev/null; then
    echo -e "${GREEN}✅ EAS CLI is available via npx${NC}"
    # Create alias for convenience
    alias eas="npx eas-cli"
else
    echo -e "${RED}❌ EAS CLI is not accessible${NC}"
    exit 1
fi

# Check if Expo CLI is accessible
if command -v expo &> /dev/null; then
    echo -e "${GREEN}✅ Expo CLI is installed globally${NC}"
elif npx @expo/cli@latest --version &>/dev/null; then
    echo -e "${GREEN}✅ Expo CLI is available via npx${NC}"
    # Create alias for convenience
    alias expo="npx @expo/cli@latest"
else
    echo -e "${RED}❌ Expo CLI is not accessible${NC}"
    exit 1
fi

# Fix Expo dependencies
echo -e "${YELLOW}🔧 Fixing Expo dependencies...${NC}"
if command -v expo &> /dev/null; then
    npx expo install --fix
else
    npx @expo/cli@latest install --fix
fi

# Run type checking
echo -e "${YELLOW}🔍 Running TypeScript type check...${NC}"
npm run type-check

# Run linting
echo -e "${YELLOW}🔍 Running ESLint...${NC}"
npm run lint

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file...${NC}"
    cat > .env << EOF
# Environment Configuration
# Fill in your values

# Expo Configuration
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your-api-key-here
EXPO_PUBLIC_ENVIRONMENT=development

# EAS Configuration
EXPO_TOKEN=your-expo-token-here
EOF
    echo -e "${GREEN}✅ .env file created. Please fill in your configuration values.${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Check EAS configuration
if [ ! -f eas.json ]; then
    echo -e "${YELLOW}⚠️ eas.json not found. You can run 'eas build:configure' to set up EAS.${NC}"
else
    echo -e "${GREEN}✅ eas.json found${NC}"
fi

# Display next steps
echo -e "\n${GREEN}🎉 CI/CD setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Fill in your .env file with actual values"
echo -e "2. Set up GitHub secrets (see CI_CD_SETUP.md for details)"
echo -e "3. Configure EAS if not already done:"
echo -e "   ${GREEN}npx eas-cli build:configure${NC}"
echo -e "4. Test the build process:"
echo -e "   ${GREEN}npm run build:preview${NC}"
echo -e "5. Push to GitHub to trigger CI/CD pipeline"

echo -e "\n${YELLOW}Usage Tips:${NC}"
echo -e "• Use 'npx @expo/cli@latest' instead of 'expo' if global install failed"
echo -e "• Use 'npx eas-cli' instead of 'eas' if global install failed"
echo -e "• Add aliases to your ~/.bashrc for convenience:"
echo -e "  ${GREEN}echo 'alias expo=\"npx @expo/cli@latest\"' >> ~/.bashrc${NC}"
echo -e "  ${GREEN}echo 'alias eas=\"npx eas-cli\"' >> ~/.bashrc${NC}"

echo -e "\n${YELLOW}Documentation:${NC}"
echo -e "📖 See CI_CD_SETUP.md for detailed setup instructions"
echo -e "🔗 EAS Documentation: https://docs.expo.dev/eas/"
echo -e "🔗 GitHub Actions: https://docs.github.com/en/actions"

echo -e "\n${GREEN}Happy coding! 🚀${NC}" 