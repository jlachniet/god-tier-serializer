/*! god-tier-serializer 1.0.0 | MIT License | https://github.com/jlachniet/god-tier-serializer */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = void 0;
var utils_1 = __webpack_require__(974);
exports.config = {
    /**
     * Whether to infer a prototype's identifier during registration when
     * possible.
     *
     * Enabling this may cause compatibility issues, especially if your code
     * will be minified, or if you need to support legacy browsers.
     */
    get inferIdentifiers() {
        return _inferIdentifiers;
    },
    /**
     * Whether to serialize unregistered prototypes.
     *
     * You can safely leave this disabled unless you are generating prototypes
     * at runtime.
     */
    get serializePrototypes() {
        return _serializePrototypes;
    },
    set inferIdentifiers(value) {
        // Validate that the value is the correct type.
        if ((0, utils_1.safeTypeOf)(value) !== 'boolean') {
            throw new TypeError("config.inferIdentifiers set to invalid value, expected (boolean) but got (" + (0, utils_1.safeTypeOf)(value) + ")");
        }
        _inferIdentifiers = value;
    },
    set serializePrototypes(value) {
        // Validate that the value is the correct type.
        if ((0, utils_1.safeTypeOf)(value) !== 'boolean') {
            throw new TypeError("config.serializePrototypes set to invalid value, expected (boolean) but got (" + (0, utils_1.safeTypeOf)(value) + ")");
        }
        _serializePrototypes = value;
    },
};
var _inferIdentifiers = false;
var _serializePrototypes = false;


/***/ }),

/***/ 775:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserialize = void 0;
var polyfills_1 = __webpack_require__(360);
var predicates_1 = __webpack_require__(673);
var utils_1 = __webpack_require__(974);
/**
 * Deserializes a value from a string.
 * @param string The serialized value.
 * @returns The value.
 */
function deserialize(string) {
    if ((0, utils_1.safeTypeOf)(string) !== 'string') {
        throw new TypeError("deserialize called with invalid arguments, expected (string) but got (" + (0, utils_1.safeTypeOf)(string) + ")");
    }
    // Create arrays of mapped values (as parsed from the provided JSON) and
    // original values (regular JS values).
    var mappedValues = JSON.parse(string);
    var originalValues = [];
    for (var i = 0; i < mappedValues.length; i++) {
        // For each GTAny, pass the index to the unmap function.
        unmapValue(i);
    }
    /**
     * Converts a {@link GTAny} at a given index to a native value.
     * @param index The index.
     * @internal
     */
    function unmapValue(index) {
        // If the value is already mapped, return immediately.
        if (Object.getOwnPropertyNames(originalValues).indexOf(String(index)) > -1) {
            return;
        }
        // Get the mapped value.
        var mappedValue = mappedValues[index];
        switch (mappedValue[0]) {
            // If the mapped value is a GTPrimitive, convert to a native
            // primitive.
            case 'undefined':
                originalValues[index] = undefined;
                break;
            case 'null':
                originalValues[index] = null;
                break;
            case 'boolean':
                originalValues[index] = mappedValue[1];
                break;
            case 'number':
                originalValues[index] = Number(mappedValue[1]);
                break;
            case 'string':
                originalValues[index] = mappedValue[1];
                break;
            case 'bigint':
                originalValues[index] = BigInt(mappedValue[1]);
                break;
            case 'symbol':
                if (mappedValue[2] === undefined) {
                    originalValues[index] = Symbol(mappedValue[1] !== null ? mappedValue[1] : undefined);
                }
                else {
                    originalValues[index] = Symbol.for(mappedValue[2]);
                }
                break;
            case 'reference':
                // If the mapped value is a reference, get the definition and
                // add the corresponding value.
                originalValues[index] = (0, utils_1.getDefinitionByIdentifier)(mappedValue[1])[0];
                break;
            default:
                unmapValue(mappedValue[1]);
                // Unmap the GTObject to a regular object depending on the type.
                switch (mappedValue[0]) {
                    case 'Array':
                        originalValues[index] = new Array();
                        break;
                    case 'Int8Array':
                        originalValues[index] = new Int8Array(mappedValue[3]);
                        break;
                    case 'Uint8Array':
                        originalValues[index] = new Uint8Array(mappedValue[3]);
                        break;
                    case 'Uint8ClampedArray':
                        originalValues[index] = new Uint8ClampedArray(mappedValue[3]);
                        break;
                    case 'Int16Array':
                        originalValues[index] = new Int16Array(mappedValue[3]);
                        break;
                    case 'Uint16Array':
                        originalValues[index] = new Uint16Array(mappedValue[3]);
                        break;
                    case 'Int32Array':
                        originalValues[index] = new Int32Array(mappedValue[3]);
                        break;
                    case 'Uint32Array':
                        originalValues[index] = new Uint32Array(mappedValue[3]);
                        break;
                    case 'Float32Array':
                        originalValues[index] = new Float32Array(mappedValue[3]);
                        break;
                    case 'Float64Array':
                        originalValues[index] = new Float64Array(mappedValue[3]);
                        break;
                    case 'BigInt64Array':
                        originalValues[index] = new BigInt64Array(mappedValue[3]);
                        break;
                    case 'BigUint64Array':
                        originalValues[index] = new BigUint64Array(mappedValue[3]);
                        break;
                    case 'Set':
                        originalValues[index] = new Set();
                        break;
                    case 'Map':
                        originalValues[index] = new Map();
                        break;
                    case 'Date':
                        originalValues[index] = new Date(mappedValue[3]);
                        break;
                    case 'RegExp':
                        var lastSlashPosition = mappedValue[3].lastIndexOf('/');
                        var pattern = mappedValue[3].substring(1, lastSlashPosition);
                        var flags = mappedValue[3].substring(lastSlashPosition + 1);
                        originalValues[index] = new RegExp(pattern, flags);
                        break;
                    case 'Boolean':
                        originalValues[index] = new Boolean(mappedValue[3]);
                        break;
                    case 'Number':
                        originalValues[index] = new Number(mappedValue[3]);
                        break;
                    case 'String':
                        originalValues[index] = new String(mappedValue[3]);
                        break;
                    case 'Symbol':
                        if (mappedValue[4] === undefined) {
                            originalValues[index] = new Object(Symbol(mappedValue[3] !== null ? mappedValue[3] : undefined));
                        }
                        else {
                            originalValues[index] = new Object(Symbol.for(mappedValue[4]));
                        }
                        break;
                    case 'BigInt':
                        originalValues[index] = new Object(BigInt(mappedValue[3]));
                        break;
                    default:
                        originalValues[index] = Object.create(originalValues[mappedValue[1]]);
                }
                // Map the object's prototype if the object is not a standard
                // object and the prototype doesn't match the type.
                var proto = mappedValues[mappedValue[1]];
                if (mappedValue[0] !== 'Object' &&
                    (proto[0] !== 'reference' || proto[1] !== mappedValue[0])) {
                    (0, polyfills_1.setPrototypeOf)(originalValues[index], originalValues[mappedValue[1]]);
                }
        }
    }
    mappedValues.forEach(function (value, index) {
        if ((0, predicates_1.isGTObject)(value)) {
            // For each GTObject, convert the GTProperties into native properties.
            value[2].forEach(function (property) {
                if ((0, predicates_1.isGTDataProperty)(property)) {
                    // If the property is a data property.
                    Object.defineProperty(originalValues[index], originalValues[property[0]], {
                        value: originalValues[property[1]],
                        configurable: property[2],
                        enumerable: property[3],
                        writable: property[4],
                    });
                }
                else {
                    // If the property is an accessor property.
                    Object.defineProperty(originalValues[index], originalValues[property[0]], {
                        get: originalValues[property[1]],
                        set: originalValues[property[2]],
                        configurable: property[3],
                        enumerable: property[4],
                    });
                }
            });
            // If the object is a set, unmap the values.
            if (value[0] === 'Set') {
                value[3].forEach(function (valueIndex) {
                    originalValues[index].add(originalValues[valueIndex]);
                });
            }
            // If the object is a map, unmap the keys and values.
            if (value[0] === 'Map') {
                value[3].forEach(function (keyValueIndex) {
                    originalValues[index].set(originalValues[keyValueIndex[0]], originalValues[keyValueIndex[1]]);
                });
            }
        }
    });
    return originalValues[0];
}
exports.deserialize = deserialize;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = exports.register = exports.deserialize = exports.serialize = void 0;
var serialization_1 = __webpack_require__(485);
Object.defineProperty(exports, "serialize", ({ enumerable: true, get: function () { return serialization_1.serialize; } }));
var deserialization_1 = __webpack_require__(775);
Object.defineProperty(exports, "deserialize", ({ enumerable: true, get: function () { return deserialization_1.deserialize; } }));
var references_1 = __webpack_require__(886);
Object.defineProperty(exports, "register", ({ enumerable: true, get: function () { return references_1.register; } }));
var config_1 = __webpack_require__(913);
Object.defineProperty(exports, "config", ({ enumerable: true, get: function () { return config_1.config; } }));


/***/ }),

/***/ 360:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setPrototypeOf = exports.objectIs = exports.arrayFind = void 0;
/**
 * Polyfill for {@link Array.prototype.find}, gets the first element in an array
 * that satisfies a given condition.
 * @param array The array.
 * @param callback The callback.
 * @returns The first element in the array that satisfies the condition.
 * @internal
 * ```ts
 * arrayFind([1, 2, 3], (element) => element == 2) // 2
 * ```
 */
function arrayFind(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }
}
exports.arrayFind = arrayFind;
/**
 * Polyfill for {@link Object.is}, determines whether two values are the same.
 * @param value1 The first value.
 * @param value2 The second value.
 * @returns Whether the values are the same.
 * @internal
 * ```ts
 * objectIs('foo', 'bar') // false
 * ```
 */
function objectIs(value1, value2) {
    if (value1 === value2) {
        // Check if the values are strictly equal.
        if (value1 !== 0) {
            // If neither value is 0 or -0, the values are the same.
            return true;
        }
        else {
            // If either value is 0 or -0, check if 1 / x is the same for both.
            return 1 / value1 === 1 / value2;
        }
    }
    else {
        // If the values are not strictly equal, check if they are both NaN by
        // comparing them to themselves.
        return value1 !== value1 && value2 !== value2;
    }
}
exports.objectIs = objectIs;
/**
 * Polyfill for {@link Object.setPrototypeOf}, sets the prototype of an object.
 * @param object The object.
 * @param prototype The prototype.
 */
function setPrototypeOf(object, prototype) {
    // Some environments only support Object.setPrototypeOf, while others only
    // support the non-standard __proto__ property.
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(object, prototype);
    }
    else if (object.__proto__) {
        object.__proto__ = prototype;
    }
    else {
        throw new Error('Could not set prototype, not supported by environment');
    }
}
exports.setPrototypeOf = setPrototypeOf;


/***/ }),

/***/ 886:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.register = exports.definitions = void 0;
var _1 = __webpack_require__(607);
var utils_1 = __webpack_require__(974);
// An array of definitions used during serialization and deserialization.
exports.definitions = [
    [Object.prototype, 'Object'],
    [Array.prototype, 'Array'],
    [Boolean.prototype, 'Boolean'],
    [Date.prototype, 'Date'],
    [Number.prototype, 'Number'],
    [RegExp.prototype, 'RegExp'],
    [String.prototype, 'String'],
];
// Add definitions for built-in types that are not supported by all
// environments, such as typed arrays, maps, sets, etc.
typeof Int8Array !== 'undefined' &&
    exports.definitions.push([Int8Array.prototype, 'Int8Array']);
typeof Uint8Array !== 'undefined' &&
    exports.definitions.push([Uint8Array.prototype, 'Uint8Array']);
typeof Uint8ClampedArray !== 'undefined' &&
    exports.definitions.push([Uint8ClampedArray.prototype, 'Uint8ClampedArray']);
typeof Int16Array !== 'undefined' &&
    exports.definitions.push([Int16Array.prototype, 'Int16Array']);
typeof Uint16Array !== 'undefined' &&
    exports.definitions.push([Uint16Array.prototype, 'Uint16Array']);
typeof Int32Array !== 'undefined' &&
    exports.definitions.push([Int32Array.prototype, 'Int32Array']);
typeof Uint32Array !== 'undefined' &&
    exports.definitions.push([Uint32Array.prototype, 'Uint32Array']);
typeof Float32Array !== 'undefined' &&
    exports.definitions.push([Float32Array.prototype, 'Float32Array']);
typeof Float64Array !== 'undefined' &&
    exports.definitions.push([Float64Array.prototype, 'Float64Array']);
typeof BigInt64Array !== 'undefined' &&
    exports.definitions.push([BigInt64Array.prototype, 'BigInt64Array']);
typeof BigUint64Array !== 'undefined' &&
    exports.definitions.push([BigUint64Array.prototype, 'BigUint64Array']);
typeof BigInt !== 'undefined' && exports.definitions.push([BigInt.prototype, 'BigInt']);
typeof Map !== 'undefined' && exports.definitions.push([Map.prototype, 'Map']);
typeof Set !== 'undefined' && exports.definitions.push([Set.prototype, 'Set']);
typeof Symbol !== 'undefined' && exports.definitions.push([Symbol.prototype, 'Symbol']);
/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
function register(value, identifier) {
    // Validate that the arguments are the correct types.
    if ((0, utils_1.safeTypeOf)(identifier) !== 'string' &&
        (0, utils_1.safeTypeOf)(identifier) !== 'undefined') {
        throw new TypeError("register called with invalid arguments, expected (any, string?) but got (" + (0, utils_1.safeTypeOf)(value) + ", " + (0, utils_1.safeTypeOf)(identifier) + ")");
    }
    // If no identifier is provided, try to infer it.
    if (identifier === undefined) {
        if (value.constructor && value.constructor.name) {
            if (!_1.config.inferIdentifiers) {
                throw new TypeError('register called without an identifier, pass as identifier or set config.inferIdentifiers to true');
            }
            identifier = value.constructor.name;
        }
        else {
            throw new Error('register called without an identifier, and the identifier could not be inferred');
        }
    }
    // Check if the value is already registered.
    if ((0, utils_1.getDefinitionByValue)(value)) {
        throw new Error('register called with a value that is already registered');
    }
    // Check if the identifier is already registered.
    if ((0, utils_1.getDefinitionByIdentifier)(identifier)) {
        throw new Error('register called with an identifier that is already registered');
    }
    exports.definitions.push([value, identifier]);
}
exports.register = register;


/***/ }),

/***/ 485:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serialize = void 0;
var config_1 = __webpack_require__(913);
var utils_1 = __webpack_require__(974);
/**
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized value.
 */
function serialize(value) {
    // To serialize a value, it must converted to an array of GTAny values.
    // Create a list of known values consisting of regular values, and an array
    // of mapped values consisting of the equivalent GTAny values.
    var knownValues = [];
    var mappedValues = [];
    // Call the main function which adds a value to the known values, maps it,
    // and adds the mapped value to the mapped values. This function will call
    // itself recursively to handle its properties and prototype, so once this
    // call is done, both arrays will most likely contain several values.
    mapValue(value, '(root)');
    // Return the mapped values as text.
    return JSON.stringify(mappedValues);
    /**
     * Converts a value to a {@link GTAny} and adds the original value to
     * {@link knownValues} and the converted value to {@Link mappedValues}.
     * @param value The value.
     * @param path The path.
     * @returns The index at which the value was added.
     * @internal
     */
    function mapValue(value, path) {
        if ((0, utils_1.safeIndexOf)(knownValues, value) > -1) {
            // If the value is already mapped, return the index of the value.
            return (0, utils_1.safeIndexOf)(knownValues, value);
        }
        // See if the value is registered, and create a GTReference if it is.
        var definition = (0, utils_1.getDefinitionByValue)(value);
        if (definition) {
            knownValues.push(value);
            mappedValues.push(['reference', definition[1]]);
            return knownValues.length - 1;
        }
        // Call the appropriate function to map the value depending on the type
        // of the value.
        switch ((0, utils_1.safeTypeOf)(value)) {
            case 'undefined':
                return mapUndefined();
            case 'null':
                return mapNull();
            case 'boolean':
                return mapBoolean(value);
            case 'number':
                return mapNumber(value);
            case 'string':
                return mapString(value);
            case 'bigint':
                return mapBigInt(value);
            case 'symbol':
                return mapSymbol(value);
            case 'object':
                return mapObject(value, path);
            default:
                throw new TypeError("Failed to serialize value with unknown type " + (0, utils_1.safeTypeOf)(value));
        }
    }
    /**
     * Adds undefined to the known and mapped values.
     * @returns The index at which undefined was added.
     * @internal
     */
    function mapUndefined() {
        knownValues.push(undefined);
        mappedValues.push(['undefined']);
        return knownValues.length - 1;
    }
    /**
     * Adds null to the known and mapped values.
     * @returns The index at which null was added.
     * @internal
     */
    function mapNull() {
        knownValues.push(null);
        mappedValues.push(['null']);
        return knownValues.length - 1;
    }
    /**
     * Adds a boolean to the known and mapped values.
     * @param boolean The boolean.
     * @returns The index at which the boolean was added.
     * @internal
     */
    function mapBoolean(boolean) {
        knownValues.push(boolean);
        mappedValues.push(['boolean', boolean]);
        return knownValues.length - 1;
    }
    /**
     * Adds a number to the known and mapped values.
     * @param number The number.
     * @returns The index at which the number was added.
     * @internal
     */
    function mapNumber(number) {
        knownValues.push(number);
        mappedValues.push(['number', (0, utils_1.numberToString)(number)]);
        return knownValues.length - 1;
    }
    /**
     * Adds a string to the known and mapped values.
     * @param string The string.
     * @returns The index at which the string was added.
     * @internal
     */
    function mapString(string) {
        knownValues.push(string);
        mappedValues.push(['string', string]);
        return knownValues.length - 1;
    }
    /**
     * Adds a BigInt to the known and mapped values.
     * @param bigint The BigInt.
     * @returns The index at which the BigInt was added.
     * @internal
     */
    function mapBigInt(bigint) {
        knownValues.push(bigint);
        mappedValues.push(['bigint', String(bigint)]);
        return knownValues.length - 1;
    }
    /**
     * Adds a symbol to the known and mapped values.
     * @param symbol The symbol.
     * @returns The index at which the symbol was added.
     * @internal
     */
    function mapSymbol(symbol) {
        knownValues.push(symbol);
        if (Symbol.keyFor(symbol) === undefined) {
            // Normal symbol.
            mappedValues.push([
                'symbol',
                symbol.description !== undefined ? symbol.description : null,
            ]);
        }
        else {
            // Symbol from the global registry.
            mappedValues.push(['symbol', symbol.description, Symbol.keyFor(symbol)]);
        }
        return knownValues.length - 1;
    }
    /**
     * Adds an object to the known and mapped values.
     * @param object The object.
     * @param path The path.
     * @returns The index at which the object was added.
     * @internal
     */
    function mapObject(object, path) {
        // Add the object to the known values and record its position so it can
        // be returned later.
        knownValues.push(object);
        var position = knownValues.length - 1;
        // Create a GTObject and add it to the mapped values. The GTObject
        // will have its properties set later, for now it just needs to
        // reserve a position in the mapped values.
        var mappedObj;
        switch ((0, utils_1.objectTypeOf)(object)) {
            case 'Array':
                mappedObj = ['Array', 0, []];
                break;
            // Typed arrays are functionally identical, so getTypedArrayTemplate
            // will create the empty GTTypedArray based on the constructor.
            case 'Int8Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Int8Array);
                break;
            case 'Uint8Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Uint8Array);
                break;
            case 'Uint8ClampedArray':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Uint8ClampedArray);
                break;
            case 'Int16Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Int16Array);
                break;
            case 'Uint16Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Uint16Array);
                break;
            case 'Int32Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Int32Array);
                break;
            case 'Uint32Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Uint32Array);
                break;
            case 'Float32Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Float32Array);
                break;
            case 'Float64Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, Float64Array);
                break;
            case 'BigInt64Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, BigInt64Array);
                break;
            case 'BigUint64Array':
                mappedObj = (0, utils_1.getTypedArrayTemplate)(object, BigUint64Array);
                break;
            case 'Set':
                mappedObj = ['Set', 0, [], []];
                break;
            case 'Map':
                mappedObj = ['Map', 0, [], []];
                break;
            case 'Date':
                mappedObj = ['Date', 0, [], Date.prototype.valueOf.call(object)];
                break;
            case 'RegExp':
                mappedObj = ['RegExp', 0, [], RegExp.prototype.toString.call(object)];
                break;
            case 'Boolean':
                mappedObj = ['Boolean', 0, [], Boolean.prototype.valueOf.call(object)];
                break;
            case 'Number':
                mappedObj = [
                    'Number',
                    0,
                    [],
                    (0, utils_1.numberToString)(Number.prototype.valueOf.call(object)),
                ];
                break;
            case 'String':
                mappedObj = ['String', 0, [], String.prototype.valueOf.call(object)];
                break;
            case 'Symbol':
                var symbol = Symbol.prototype.valueOf.call(object);
                if (Symbol.keyFor(symbol) === undefined) {
                    // Normal symbol.
                    mappedObj = ['Symbol', 0, [], symbol.description];
                }
                else {
                    // Symbol from the global registry.
                    mappedObj = [
                        'Symbol',
                        0,
                        [],
                        symbol.description !== undefined ? symbol.description : null,
                        Symbol.keyFor(symbol),
                    ];
                }
                break;
            case 'BigInt':
                mappedObj = [
                    'BigInt',
                    0,
                    [],
                    String(BigInt.prototype.valueOf.call(object)),
                ];
                break;
            case 'AsyncFunction':
            case 'AsyncGeneratorFunction':
            case 'Function':
            case 'GeneratorFunction':
                // For security reasons, functions cannot be serialized directly.
                throw new Error("Could not serialize unregistered function at " + path);
            default:
                mappedObj = ['Object', 0, []];
        }
        mappedValues.push(mappedObj);
        // Map the object's prototype and set the index.
        if (Object.getPrototypeOf(object) !== null &&
            !(0, utils_1.getDefinitionByValue)(Object.getPrototypeOf(object)) &&
            !config_1.config.serializePrototypes) {
            throw new Error("Could not serialize value with unregistered prototype at " + path);
        }
        mappedObj[1] = mapValue(Object.getPrototypeOf(object), '');
        // Gets the keys of the object (not including the ones in the prototype
        // chain).
        var keys = Object.getOwnPropertyNames(object);
        if (Object.getOwnPropertySymbols) {
            keys = keys.concat(Object.getOwnPropertySymbols(object));
        }
        keys.forEach(function (key) {
            // For each property on the object, get the descriptor and add a
            // GTProperty to the GTObject based on it.
            var descriptor = Object.getOwnPropertyDescriptor(object, key);
            if (descriptor.get || descriptor.set) {
                mappedObj[2].push([
                    mapValue(key, ''),
                    mapValue(descriptor.get, path + "[\"" + String(key) + "\" getter]"),
                    mapValue(descriptor.set, path + "[\"" + String(key) + "\" setter]"),
                    descriptor.configurable,
                    descriptor.enumerable,
                ]);
            }
            else {
                mappedObj[2].push([
                    mapValue(key, ''),
                    mapValue(descriptor.value, path + "[\"" + String(key) + "\"]"),
                    descriptor.configurable,
                    descriptor.enumerable,
                    descriptor.writable,
                ]);
            }
        });
        // If the object is a set, map the values.
        if (mappedObj[0] === 'Set') {
            var i_1 = 0;
            Set.prototype.forEach.call(object, function (value) {
                mappedObj[3].push(mapValue(value, path + " val#" + i_1));
                i_1++;
            });
        }
        // If the object is a map, map the key-value pairs.
        if (mappedObj[0] === 'Map') {
            var i_2 = 0;
            Map.prototype.forEach.call(object, function (value, key) {
                mappedObj[3].push([
                    mapValue(key, path + " key#" + i_2),
                    mapValue(value, path + " val#" + i_2),
                ]);
                i_2++;
            });
        }
        // Return the position at which the object was added.
        return position;
    }
}
exports.serialize = serialize;


/***/ }),

/***/ 673:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isGTDataProperty = exports.isGTObject = void 0;
var utils_1 = __webpack_require__(974);
/**
 * Checks whether a {@link GTAny} is a {@link GTObject}.
 * @param value The GTAny.
 * @returns Whether the GTAny is a GTObject.
 * @internal
 * ```ts
 * isGTObject(['number', '3']) // false
 * ```
 */
function isGTObject(value) {
    return value[0].charAt(0) === value[0].charAt(0).toUpperCase();
}
exports.isGTObject = isGTObject;
/**
 * Checks whether a {@link GTProperty} is a {@link GTDataProperty}.
 * @param value The GTProperty.
 * @returns Whether the GTProperty is a GTDataProperty.
 * @internal
 * ```ts
 * isGTDataProperty([1, 2, true, true, true]) // true
 * ```
 */
function isGTDataProperty(value) {
    return (0, utils_1.safeTypeOf)(value[2]) === 'boolean';
}
exports.isGTDataProperty = isGTDataProperty;


/***/ }),

/***/ 974:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTypedArrayTemplate = exports.numberToString = exports.getDefinitionByValue = exports.getDefinitionByIdentifier = exports.objectTypeOf = exports.safeTypeOf = exports.safeIndexOf = void 0;
var polyfills_1 = __webpack_require__(360);
var references_1 = __webpack_require__(886);
/**
 * Gets the index of an element in an array.
 *
 * Similar to {@link Array.prototype.indexOf}, but uses {@link objectIs} to
 * check equality.
 * @param array The array.
 * @param element The element.
 * @returns The position of the element in the array, or -1 if not found.
 * @internal
 * ```ts
 * safeIndexOf([1, 2, 3], 2) // 1
 * ```
 */
function safeIndexOf(array, element) {
    for (var i = 0; i < array.length; i++) {
        if ((0, polyfills_1.objectIs)(array[i], element)) {
            return i;
        }
    }
    return -1;
}
exports.safeIndexOf = safeIndexOf;
/**
 * Gets the type of a value as a string.
 *
 * Similar to the typeof keyword, but handles null and functions correctly.
 * @param value The value.
 * @returns The type of the value.
 * @internal
 * ```ts
 * safeTypeOf(3) // 'number'
 * ```
 */
function safeTypeOf(value) {
    if (value === null) {
        // Null normally evaluates incorrectly to 'object'.
        return 'null';
    }
    else if (typeof value === 'function') {
        // Functions normally evaluate incorrectly to 'function'.
        return 'object';
    }
    else {
        // TypeScript doesn't recognize that typeof will not return 'function'
        // so the output of the expression needs to be manually cast.
        return typeof value;
    }
}
exports.safeTypeOf = safeTypeOf;
/**
 * Gets the type of an object as a string.
 *
 * Note that this gets the type that the object was created as, so if you modify
 * the prototype of the object, the same string will still be returned.
 * @param object The object.
 * @returns The type of the object.
 * @internal
 * ```ts
 * objectTypeOf([]) // 'Array'
 * ```
 */
function objectTypeOf(object) {
    if (getDefinitionByValue(object)) {
        console.log();
    }
    return Object.prototype.toString.call(object).slice(8, -1);
}
exports.objectTypeOf = objectTypeOf;
/**
 * Gets a value definition from an identifier.
 * @param identifier The identifier.
 * @returns The value definition.
 * @internal
 * ```ts
 * getDefinitionByIdentifier('Foo') // [{}, 'Foo']
 * ```
 */
function getDefinitionByIdentifier(identifier) {
    return (0, polyfills_1.arrayFind)(references_1.definitions, function (definition) { return identifier === definition[1]; });
}
exports.getDefinitionByIdentifier = getDefinitionByIdentifier;
/**
 * Gets a value definition from a value.
 * @param value The value.
 * @returns The value definition.
 * @internal
 * ```ts
 * getDefinitionByValue({}) // [{}, 'Foo']
 * ```
 */
function getDefinitionByValue(value) {
    return (0, polyfills_1.arrayFind)(references_1.definitions, function (definition) { return value === definition[0]; });
}
exports.getDefinitionByValue = getDefinitionByValue;
/**
 * Converts a number to a string
 *
 * Similar to {@link Number.prototype.toString}, but handles -0 correctly.
 * @param number The number.
 * @returns The number as a string.
 * @internal
 * ```ts
 * numberToString(3) // '3'
 * ```
 */
function numberToString(number) {
    return (0, polyfills_1.objectIs)(number, -0) ? '-0' : String(number);
}
exports.numberToString = numberToString;
/**
 * Creates a {@link GTTypedArray} with no properties from a typed array and a
 * TypedArray constructor.
 * @param typedArray The typed array.
 * @param constructor The constructor.
 * @returns
 * @internal
 */
function getTypedArrayTemplate(typedArray, constructor) {
    return [
        constructor.name,
        0,
        [],
        constructor.prototype.toString.call(typedArray).split(',').length,
    ];
}
exports.getTypedArrayTemplate = getTypedArrayTemplate;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;