# NewsFeedApp

## Setup

npm install
npx pod-install
npx react-native run-android

## Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Navigation
- AsyncStorage

## Architecture Decision

Used feature-based folder structure for scalability.

Redux Toolkit chosen because async API handling and predictable global state.

AsyncStorage used for bookmark persistence because lightweight and sufficient for this task.

## Trade-offs

If more time available:

- Add MMKV for faster storage
- Better skeleton loaders
- Swipe remove bookmarks
- Better animations

## Section 02 Answers

(Interview Question's and answers below) : -

## Q1 - Bridge vs JSI

Legacy bridge uses async serialized communication between JS and Native modules.

JSI allows direct JavaScript to native communication without JSON bridge overhead.

This reduces latency, improves startup, and heavy UI performance.

Fabric improves rendering system.
TurboModules improve lazy native module loading.


## Q2 FlatList Janky

1. Use Flipper performance monitor.
2. Check unnecessary re-renders.
3. Add keyExtractor.
4. Add getItemLayout.
5. Memoize row components.
6. Reduce inline functions.
7. Use windowSize / initialNumToRender tuning.


## Q3 useMemo/useCallback

Useful when expensive sorting/filtering large lists.

useMemo prevents recalculating sorted list every render.

Bad use: wrapping tiny values/functions everywhere adds memory overhead and complexity.

## Q4 State Management

Context good for small apps.

Redux Toolkit best for medium/large apps with APIs and debugging.

Zustand lightweight and simple.

I chose Redux Toolkit for predictable scalable architecture.

## Q5 Offline First

Use NetInfo for connectivity.

Cache last successful API response locally.

Show offline banner and stale data.

Invalidate cache by timestamp or pull-to-refresh.

Trade-off: stale data risk vs better UX.

