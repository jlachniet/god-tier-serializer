# Changelog

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
