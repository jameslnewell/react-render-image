# Change log

## 3.0.1

- Added `sideEffects` flag for optimal tree-shaking

## 3.0.0

- Extracted the `useImage({src})` hook from the `Image` component
- Exporting using named exports
- renamed `ImageRenderer*` to `Image*`
- switched status to be a string
- switched bundler to vanilla rollup

## 2.1.0

- Added support for `srcset` and `sizes`

## 2.0.0

- Switch from Flowtype to Typescript which changes how the library is bundled and means we're no longer providing typings for Flowtype
- Moved `react` to a `peerDependency` and bumped the minimum version to `^16.8.0`

## 1.1.3

- fix SSR support ([#1](https://github.com/jameslnewell/react-render-image/pull/1))

## 1.1.2

- improved perf by removing cascading updates
