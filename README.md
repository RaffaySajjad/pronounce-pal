# PronouncePal

iOS-first, Android-ready React Native app for practicing English pronunciation with AI characters.

## Project Structure

```
src/
├── app/                    # Application layer
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx      # Custom button component
│   │   ├── Text.tsx        # Typography component
│   │   └── theme.ts        # Global theme system
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   └── screens/            # Screen components
│       ├── OnboardingScreen.tsx
│       ├── HomeScreen.tsx
│       ├── ScenarioPickerScreen.tsx
│       ├── SessionScreen.tsx
│       ├── DrillScreen.tsx
│       ├── PaywallScreen.tsx
│       └── ProfileScreen.tsx
├── lib/                    # Utilities and external integrations
│   ├── api.ts              # API layer with stubbed endpoints
│   └── utils.ts            # Utility functions
├── state/                  # Global state management
│   └── stores/
│       ├── userStore.ts    # User state (Zustand)
│       └── sessionStore.ts # Session state (Zustand)
├── types/                  # TypeScript type definitions
│   └── index.ts
└── assets/                 # Static assets
    ├── images/
    └── fonts/
```

## Features (Scaffold)

### ✅ Completed
- [x] React Native project setup with TypeScript
- [x] Navigation system with all required screens
- [x] Global state management (Zustand)
- [x] Folder structure aligned with PRD
- [x] Basic styling system and reusable components
- [x] Stubbed API layer with placeholder endpoints
- [x] PRD section comments throughout codebase

### 🚧 Placeholder Screens
- **Onboarding**: User introduction and permissions
- **Home**: Dashboard with quick actions and progress
- **ScenarioPicker**: Browse and select practice scenarios
- **Session**: Main practice session with AI character
- **Drill**: Targeted pronunciation drills
- **Paywall**: Premium subscription upgrade
- **Profile**: User settings and progress overview

### 📋 API Endpoints (Stubbed)
- `POST /v1/speech` - Speech recognition and pronunciation analysis
- `POST /v1/reply` - AI character responses
- `POST /v1/drills/generate` - Generate targeted drills
- `GET /v1/scenarios` - Get available scenarios

## Getting Started

### Prerequisites
- Node.js >= 20
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio and emulator (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. iOS setup:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

3. Run the app:
```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
```

## Development Notes

- All screens are currently placeholders with UI mockups
- API calls return mock data for development
- State management is set up but not fully integrated
- Navigation between screens is functional
- Theme system provides consistent styling

## Next Steps (Not Implemented Yet)

1. **Speech Recognition Integration**
   - Integrate with speech-to-text service
   - Implement real-time audio processing
   - Add microphone permissions handling

2. **AI Character System**
   - Implement conversation flow logic
   - Add character avatars and animations
   - Integrate with AI response generation

3. **Pronunciation Analysis**
   - Implement phonetic analysis
   - Add mistake detection algorithms
   - Create feedback visualization

4. **User Authentication**
   - Add login/signup flows
   - Implement user session management
   - Add social auth options

5. **Premium Features**
   - Integrate in-app purchases
   - Add subscription management
   - Implement feature gating

6. **Progress Tracking**
   - Add analytics integration
   - Implement progress persistence
   - Create detailed reporting

## Architecture Principles

Following user rules for clean, maintainable code:
- SOLID principles applied throughout
- Low cyclomatic complexity (<10)
- TypeScript for type safety
- Modular component architecture
- Consistent error handling
- Performance-optimized state management

## PRD Alignment

This scaffold aligns with PRD Section 4: Scope — MVP Features, providing a solid foundation for implementing the core functionality while maintaining clean architecture and following React Native best practices.