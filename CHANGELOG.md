# Changelog

## 1.1.0

- Allow identifiers and values to be registered multiple times, instead of throwing an error. This can be useful if your library is persisted after reloads in some frameworks such as Next.js. This unfortunately also means that this library will no longer warn you if you unintentionally register the same value or identifier twice.

## 1.0.0

- Initial production release

This release is functionally identical to the previous release, and is intended for production use. While I have tried to test as thoroughly as possible, there may still be bugs. [Please report any issues you encounter.](https://github.com/jlachniet/god-tier-serializer/issues)

## 0.5.3

- Add TypeScript definitions
- Change error messages to include the "path" in an object at which they were thrown
- Fixed symbols without a description not serializing correctly
- Improved documentation

## 0.5.2

- Fixed incorrect entry point for node

## 0.5.1

- Separated builds into node and browser builds
- Fixed issues with ES5 compatibility

## 0.5.0

- Added the ability to register any value, not just objects
- Added support for accessors (getters and setters)
- New supported type:
  - Symbol Object
- Fixed symbol keys not being serialized

The main functionality of this project is now fully implemented. I will be working on fixing bugs, creating documentation, and cleaning up code. Once the project is stable and user-friendly, 1.0.0 will be released.

## 0.4.0

- New supported types:
  - Symbol
  - Map
  - Set
  - TypedArray
    - Int8Array
    - Uint8Array
    - Uint8ClampedArray
    - Int16Array
    - Uint16Array
    - Int32Array
    - Uint32Array
    - Float32Array
    - Float64Array
    - BigInt64Array
    - BigUint64Array

## 0.3.0

- New supported types:
  - Function
  - Async Function
  - Generator Function
  - Async Generator Function
  - Boolean Object
  - Number Object
  - BigInt Object
- Added support for prototype serialization

## 0.2.0

- New supported types:
  - Array
  - Date
  - RegExp
  - String Object
- Migrated to webpack for building
- Added "files" field to package.json

## 0.1.0

- Initial development release
