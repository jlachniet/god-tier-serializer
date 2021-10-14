# god-tier-serializer

![Release](https://img.shields.io/github/v/release/jlachniet/god-tier-serializer?include_prereleases)
![License](https://img.shields.io/npm/l/god-tier-serializer)
![Tests](https://img.shields.io/github/workflow/status/jlachniet/god-tier-serializer/tests)
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
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized value.
 */
function serialize(value: any): string;

/**
 * Deserializes a value from a string.
 * @param string The serialized value.
 * @returns The value.
 */
function deserialize(string: string): unknown;

/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
function register(value: any, identifier?: string): void;
```

## Advanced usage:

### Identifier inference:

When you register a value, you must provide an identifier for it. This is to allow for backwards compatibility in your code. As long as your identifiers remain constant, the values that they are associated with can change. If you are registering a prototype of a function or class, the identifier may be able to be inferred if the prototype has a constructor with a name property.

If you enable `config.inferIdentifiers` and call `register` without an identifier, the register function will check if `value.constructor.name` is set. If it is, it will use it as the identifier. This allows you to write code like this:

```ts
class Foo {}
register(Foo.prototype);
```

Please use caution if you enable this setting. While convenient, it can cause compatibility problems. Most JavaScript built tools will perform minification, which will wreak havoc on function names. In addition, the `name` property is not supported in all environments. If your code is running in a browser, you likely want this to be disabled. If your code is running on a server and isn't going through a build tool, you can probably enable this safely.

### Function serialization:

Functions can only be serialized as references. This is to prevent arbitrary code execution exploits.

### Prototype serialization:

The `serialize` function will try to convert the value that you give it as accurately as possible. As part of the serialization process, the serializer will call itself recursively on properties and internal values. For example, serializing an object will serialize each of its properties, and the properties of those properties, and so on.

In addition, objects have prototypes which must be serialized. In most code, these prototypes are defined by classes and functions. **god-tier-serializer** assumes that this is true by default. When the serializer encounters a prototype that it needs to serialize, it will check if the prototype is registered. If it is not, it will throw an error.

If you need to store your prototypes as part of the serialization process, you can enable `config.serializePrototypes`. Unless you really
know what you're doing, this is a bad idea. The object you serialize will not have the same prototype as the reconstructed object, but rather a reconstruction of the prototype.

### Non-prototype registration:

Most of the time, the `register` function is used for registering prototypes. Registration allows instances of your functions and classes to be serialized. This is helpful, since if you change your code to modify a prototype after serialization, the deserialization will still succeed. However, registration is not limited to prototypes. You can register any value you want. When the serializer encounters the value, it is converted to a reference.

For example, if you know that the data you are serializing will contain a long constant piece of text that is stored elsewhere, it might make more sense to register the text. That way, the serialized string will not contain the text itself, but rather a reference to the text.

## Configuration:

```ts
/**
 * Whether to infer a prototype's identifier during registration when possible.
 *
 * Enabling this may cause compatibility issues, especially if your code will be
 * minified, or if you need to support legacy browsers.
 */
config.inferIdentifiers = false;

/**
 * Whether to serialize unregistered prototypes.
 *
 * You can safely leave this disabled unless you are generating prototypes at
 * runtime.
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
  - Set
  - Map
  - Date
  - RegExp
  - Primitive Wrapper Objects:
    - Boolean Object
    - Number Object
    - String Object
    - Symbol Object
    - BigInt Object
  - Functions: _(serialized as references only)_
    - Standard Function
    - Async Function
    - Generator Function
    - Async Generator Function

## Browser/environment support:

**god-tier-serializer** supports any browser or environment that supports ES5. Some functionality may require a newer environment, such as deserializing modified prototypes and newer types.

## License

**god-tier-serializer** is released under the MIT License. For more information, please see the [LICENSE](https://github.com/jlachniet/god-tier-serializer/blob/main/LICENSE).
