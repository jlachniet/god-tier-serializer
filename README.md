# god-tier-serializer

**<ins>Warning:</ins> god-tier-serializer is still under development and is not ready for production use.**

_Convert any value to and from a serialized string with no headache._

In JavaScript, you often need to store a variable for later, like in local storage or in a file. This means that you need your variable as a string. If your data is simple, then this isn't too hard. But what do you do if you have a complicated data structure? **god-tier-serializer** solves this problem for you.

**god-tier-serializer** is better than `JSON.stringify`/`JSON.parse` and other serialization libraries because it's incredibly simple to use and supports most built-in types _(WIP)_, custom prototypes, references, nesting, custom descriptors, and more.

## Usage:

If your variable is a [supported](#supported-types) built-in, all you have to do it call `serialize` and `deserialize`.

```js
const { serialize, deserialize } = require('god-tier-serializer');

let author = {
	name: 'Julian Lachniet',
	gender: 'male',
};
let authorSerialized = serialize(author);
let author2 = deserialize(authorSerialized);

console.log(author);
console.log(author2);
```

If your variable has a custom prototype (like an instance of a class), then just register the prototype first.

```js
const { register, serialize } = require('god-tier-serializer');

class Person {}
register(Person.prototype);

let author = new Person();
let authorSerialized = serialize(author);
```

Nested object are supported, but keep in mind that nested objects with custom prototypes also have to be registered.

```js
const { register, serialize } = require('god-tier-serializer');

class Person {}
register(Person.prototype);

let projectInfo = {
	author: new Person(),
};
let projectInfoSerialized = serialize(projectInfo);
```

## Configuration:

```ts
const { config } = require('god-tier-serializer');

/**
 * Whether to try to infer a prototype's identifer when possible.
 */
config.inferIdentifiers = false;
/**
 * Whether to serialize unregistered prototypes.
 */
config.serializePrototypes = false;
```

## Browser/environment support:

**god-tier-serializer** should support any browser or environment that supports ES5. Some features may require later versions of JavaScript.

## Supported types:

Since **god-tier-serializer** is still in development, not every built-in type in supported yet. The following tracks the progress of how well every type is supported.

✔️ = Fully supported

📝 = Partially supported

❌ = Not supported

```
✔️ Undefined
✔️ Null
✔️ BigInt
✔️ Boolean
✔️ Number
✔️ String
📝 Object
   📝 Object with prototype null
   📝 Object with prototype Object.prototype
   📝 Object with custom prototype
   📝 Array
     ❌ Int8Array
     ❌ Uint8Array
     ❌ Uint8ClampedArray
     ❌ Int16Array
     ❌ Uint16Array
     ❌ Int32Array
     ❌ Uint32Array
     ❌ Float32Array
     ❌ Float64Array
     ❌ BigInt64Array
     ❌ BigUint64Array
   📝 Date
   📝 RegExp
   📝 Function
   ❌ BigInt Object
   📝 Boolean Object
   📝 Number Object
   📝 String Object
   ❌ Symbol Object
   ❌ Error
     ❌ AggregateError
     ❌ EvalError
     ❌ InternalError
     ❌ RangeError
     ❌ ReferenceError
     ❌ SyntaxError
     ❌ TypeError
     ❌ URIError
   ❌ Map
   ❌ Set
   ❌ ArrayBuffer
   ❌ SharedArrayBuffer
   ❌ DataView
   ❌ Promise
   ❌ Generator
   ❌ GeneratorFunction
   ❌ AsyncFunction
   ❌ AsyncGenerator
   ❌ AsyncGeneratorFunction
   ❌ Proxy
   ❌ Intl.Collator
   ❌ Intl.DateTimeFormat
   ❌ Intl.ListFormat
   ❌ Intl.NumberFormat
   ❌ Intl.PluralRules
   ❌ Intl.RelativeTimeFormat
   ❌ Intl.Locale
   ❌ WebAssembly.Module
   ❌ WebAssembly.Instance
   ❌ WebAssembly.Memory
   ❌ WebAssembly.Table
   ❌ WebAssembly.CompileError
   ❌ WebAssembly.LinkError
   ❌ WebAssembly.RuntimeError
❌ Symbol
```

## License

**god-tier-serializer** is released under the MIT License. For more information, please [LICENSE](https://github.com/jlachniet/god-tier-serializer/blob/main/LICENSE).
