# Tapza Care – React Native Assignment

A React Native patient-care application built as part of the Tapza Care technical assignment.

The app demonstrates a remotely configurable home screen, multilingual content, appointment booking, prescriptions/reminders, offline configuration fallback, runtime theme changes, loading/error states, and animated UI interactions.

## Tech Stack

- React Native CLI
- TypeScript
- React Navigation
- Zustand
- React Native Reanimated
- React Native Gesture Handler
- @gorhom/bottom-sheet
- AsyncStorage
- react-native-linear-gradient
- Jest

## How to Run

### Requirements

- Node.js
- Watchman
- Android Studio / Android SDK
- Xcode + CocoaPods for iOS
- React Native CLI environment

### Install dependencies

```bash
yarn install
```

### iOS

```bash
cd ios
pod install
cd ..
yarn ios
```

### Android

```bash
yarn android
```

### TypeScript check

```bash
npx tsc --noEmit
```

## Folder Structure

```text
src/
├── api/
│   ├── client.ts
│   ├── configApi.ts
│   ├── doctorsApi.ts
│   ├── slotsApi.ts
│   ├── bookingsApi.ts
│   └── prescriptionsApi.ts
│
├── components/
│   └── home/
│       ├── SectionRenderer.tsx
│       ├── SectionBackground.tsx
│       ├── HeroBanner.tsx
│       ├── CategoryChips.tsx
│       ├── QuickActions.tsx
│       ├── ServiceGrid.tsx
│       ├── DoctorCarousel.tsx
│       └── OfferStrip.tsx
│
├── mocks/
│   ├── normalConfig.json
│   ├── diwaliConfig.json
│   ├── doctors.json
│   ├── slots.json
│   └── prescriptions.json
│
├── navigation/
│   └── AppNavigator.tsx
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── DoctorSelectionScreen.tsx
│   ├── DateSelectionScreen.tsx
│   ├── BookingConfirmationScreen.tsx
│   ├── BookingSuccessScreen.tsx
│   ├── BookingsScreen.tsx
│   ├── PrescriptionsScreen.tsx
│   ├── PrescriptionDetailScreen.tsx
│   └── ProfileScreen.tsx
│
├── store/
│   ├── configStore.ts
│   ├── bookingStore.ts
│   ├── reminderStore.ts
│   └── languageStore.ts
│
├── theme/
│   └── createTheme.ts
│
├── types/
│   ├── config.ts
│   ├── booking.ts
│   └── prescription.ts
│
└── utils/
    ├── configValidator.ts
    └── configCache.ts
```

## Architecture Decisions

### Remote-driven Home Screen

The home screen is driven by the `/config` response instead of hard-coded screen composition.

The backend can control:

- Section order
- Section type
- Section content
- Background
- Theme
- Bottom tabs
- Festival configuration

Supported section types:

```text
hero_banner
category_chips
quick_actions
service_grid
doctor_carousel
offer_strip
```

Unknown section types are intentionally ignored so that adding a new backend section does not crash older app versions.

### Configuration Validation

Remote configuration is treated as `unknown` and validated before being used.

This prevents malformed configuration data from directly reaching the UI.

### Offline Configuration Fallback

The last valid configuration is stored using AsyncStorage.

If the network request fails, the app attempts to render the last valid cached configuration. If no cache exists, an error state is displayed.

### State Management

Zustand is used for small, focused application state:

- Remote configuration
- Language
- Booking state
- Reminder/dose state

A larger state-management layer was intentionally avoided because it would add unnecessary complexity for this assignment.

### Theme

The UI consumes theme values generated from the remote configuration.

Colors, spacing, typography and radius values are centralized rather than scattered throughout the UI.

### Booking Flow

The booking flow is split into independent screens:

```text
Doctor
  ↓
Date
  ↓
Time Slot
  ↓
Confirmation
  ↓
Success
```

The booking store supports optimistic state, successful confirmation, conflicts and errors.

### Multilingual Content

Remote content supports:

- English
- Telugu

Localized values are represented as:

```ts
{
  en: 'Book Appointment',
  te: 'అపాయింట్‌మెంట్ బుక్ చేయండి'
}
```

The selected language is controlled through Zustand.

This keeps localization data-driven instead of duplicating screens for each language.

## Runtime Configuration Demo

The Profile screen can switch between:

- Normal configuration
- Diwali configuration

This demonstrates that the application UI can change without modifying the screen implementation.

The configuration can change:

- Theme colors
- Festival greeting
- Section order
- Section content
- Services
- Offers

An intentionally unknown section type is also included to demonstrate graceful handling of unsupported sections.

## Resilience

The mock network layer supports configurable latency and failures.

Example:

```ts
mockNetwork.latencyMs = 700;
mockNetwork.shouldFail = false;
```

This allows loading, error and cached-data scenarios to be tested without depending on a real backend.

## What I Cut / Simplified

Given the assignment time constraint, some areas were intentionally simplified.

### Backend

No real backend was implemented.

The API layer is separated from the UI and uses local mock data so it can later be replaced with real HTTP endpoints.

## Honest Time Spent

Approximately **5 hours** were spent on the assignment.

Approximate breakdown:

| Area                            |       Time |
| ------------------------------- | ---------: |
| Project setup & architecture    |     ~1 hrs |
| Dynamic home/config system      |     ~1 hrs |
| Booking flow                    |    ~30 min |
| Prescriptions/reminders         |    ~30 min |
| Multilingual support            |    ~30 min |
| Resilience/loading/error states |    ~30 min |
| UI polish & animations          |    ~30 min |
| README/documentation            |    ~30 min |
| **Total**                       | **~5 hrs** |

This is an approximate development-time estimate.

## Trade-offs

The primary goal was to demonstrate maintainable architecture and complete the main user flows within the assignment deadline.

Priorities were:

1. Remote-driven UI
2. Runtime configuration
3. Offline configuration fallback
4. Appointment booking flow
5. Prescription/reminder flow
6. Multilingual support
7. Loading/error states
8. Animation and UI polish

Infrastructure that would not provide meaningful value within the assignment scope was intentionally kept out.

## AI Usage

AI assistance was used during development for debugging, TypeScript issues, architecture discussion, code review and implementation guidance.

Final implementation decisions, integration, testing and debugging were performed during the development process.

See `AI_LOG.md` for details.
