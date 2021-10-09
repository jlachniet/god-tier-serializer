# god-tier-serializer

![Release](https://img.shields.io/github/v/release/jlachniet/god-tier-serializer?include_prereleases)
![Dependencies](https://img.shields.io/badge/dependencies-0-green)
![License](https://img.shields.io/npm/l/god-tier-serializer)
![Bundlephobia](https://img.shields.io/bundlephobia/min/god-tier-serializer)

**<ins>Warning:</ins> god-tier-serializer is still under development and may contain bugs.**

_Convert any value to and from a serialized string with no headache._

In JavaScript, you often need to store a variable for later, such as in local storage or a file. This means that you need your variable as a string. If your data is simple, then this conversion isn't too hard. But what do you do if you have a complicated data structure? **god-tier-serializer** solves this problem for you.

**god-tier-serializer** is better than `JSON.stringify`/`JSON.parse` and other serialization libraries because it's incredibly simple to use and supports [most built-in types](#supported-types), custom prototypes, external and cyclical references, nesting, modified descriptors, and more.

## Usage:

If your variable is a [supported](#supported-types) type, all you have to do is call `serialize` and `deserialize`.

```js
const { serialize, deserialize } = require('god-tier-serializer');

let author = {
	name: 'Julian',
	gender: 'male',
};
let authorSerialized = serialize(author);
let authorDeserialized = deserialize(authorSerialized);
```

If your variable has a custom prototype (e.g., your variable is an instance of a class or function), then register the prototype first.

```js
const { register, serialize } = require('god-tier-serializer');

class Person {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
	}
}
register(Person.prototype, 'Person');

let author = new Person('Julian', 'male');
let authorSerialized = serialize(author);
```

Nested objects are supported, just keep in mind that nested objects with custom prototypes also need to be registered.

```js
const { register, serialize } = require('god-tier-serializer');

class Person {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
	}
}
register(Person.prototype, 'Person');

let projectInfo = {
	author: new Person('Julian', 'male'),
};
let projectInfoSerialized = serialize(projectInfo);
```

## Functions:

```ts
/**
 * Serialize a value to a string.
 * @param value The value.
 * @returns The serialized value.
 */
function serialize(value: any): string;

/**
 * Deserialize a value from a string.
 * @param string The serialized value.
 * @returns The value.
 */
function deserialize(string: string): unknown;

/**
 * Register a value with an identifier so that it can be
 * referenced during serialization and retrieved during
 * deserialization.
 * @param value The object.
 * @param identifier The identifier.
 */
function register(value: any, identifier?: string): void;
```

## Configuration:

```ts
/**
 * This controls whether to try to infer a prototype's
 * identifier during registration when possible.
 *
 * Enabling this may cause compatibility issues, especially
 * if your code will be minified, or if you need to support
 * legacy browsers.
 */
config.inferIdentifiers = false;

/**
 * This controls whether to serialize unregistered
 * prototypes.
 *
 * You can safely leave this disabled unless you are
 * generating prototypes at runtime.
 */
config.serializePrototypes = false;
```

## Supported types:

- Primitives:
  - Undefined
  - Null
  - Boolean
  - Number
  - String
  - Symbol
  - BigInt
- Objects:
  - Standard Object
  - Null Object
  - Custom Prototype Object
  - Arrays:
    - Standard Array
    - Typed Arrays:
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
  - Date
  - Map
  - Set
  - Primitive Wrapper Objects:
    - Boolean Object
    - Number Object
    - String Object
    - Symbol Object
    - BigInt Object
  - RegExp
  - Functions:
    - Standard Function
    - Async Function
    - Generator Function
    - Async Generator Function

## Browser/environment support:

**god-tier-serializer** supports any browser or environment that supports ES5.

## License

**god-tier-serializer** is released under the MIT License. For more information, please see the [LICENSE](https://github.com/jlachniet/god-tier-serializer/blob/main/LICENSE).
