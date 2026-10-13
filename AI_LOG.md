# AI_LOG.md

# AI Usage Log – Tapza Care

AI tools were used as a development assistant during this assignment.

The AI was primarily used for debugging, architecture discussion, TypeScript troubleshooting, code review, and implementation guidance.

## Areas Where AI Was Used

### 1. Architecture

AI assistance was used to discuss:

- Remote-driven home screen architecture
- Configuration validation
- Offline configuration caching
- Zustand store structure
- Booking flow state management
- Multilingual configuration design

The final architecture and implementation were reviewed and integrated manually.

### 2. TypeScript & Debugging

AI was used to help diagnose TypeScript errors involving:

- Strict type narrowing
- Nested function closures
- Localized configuration types
- React Native component props
- Reanimated types
- API response typing

For example, when remote configuration changed from plain strings to localized objects, AI helped identify places where the UI needed to select the active language.

### 3. React Native Implementation

AI assistance was used for implementation guidance around:

- React Navigation
- Reanimated animations
- Bottom sheets
- Safe-area handling
- Dynamic section rendering
- Loading and error states
- AsyncStorage caching

The code was integrated and tested within the application rather than copied without verification.

### 4. Resilience

AI was used to design and debug:

- Mock network latency
- Mock network failures
- Configuration fallback
- Empty states
- Booking conflicts
- Optimistic booking state

### 5. Code Review

AI was used to review code for:

- TypeScript correctness
- Component responsibilities
- State management
- Error handling
- Maintainability
- Potential runtime issues

## What Was Not Delegated to AI

The following decisions and activities were performed as part of the development process:

- Final feature prioritization
- Project structure
- Integration of components
- Running the application
- Testing the UI
- Debugging runtime issues
- Verifying TypeScript compilation
- Git commits
- Final implementation decisions

AI suggestions were treated as development guidance and were modified when they did not fit the project's requirements.

## AI Limitations Encountered

Some AI-generated suggestions required correction during implementation.

For example:

- A schema validation approach using Zod caused a Babel compatibility issue and was removed.
- Some React Native UI approaches required runtime verification before being accepted.
- TypeScript narrowing issues were resolved by introducing explicit local references.

These issues were identified through actual project builds and TypeScript checks.

## Summary

AI was used as a development assistant rather than as a replacement for implementation and testing.

The final application was assembled, integrated, tested and debugged in the React Native project during the assignment.
