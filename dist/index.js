"use strict";
var GodTierSerializer = (function () {
    var config = {
        forceSerialization: false,
        inferPrototypeNames: false,
    };
    var prototypeDefinitions = [
        [null, 'null'],
        [Object.prototype, 'Object'],
        [Array.prototype, 'Array'],
        [Date.prototype, 'Date'],
        [RegExp.prototype, 'RegExp'],
        [String.prototype, 'String'],
    ];
    /**
     * Polyfill for {@link Array.prototype.find}, gets the first element in an
     * array that satisfies a given condition.
     * @param array The array.
     * @param callback The function to call for each element.
     * @returns The element.
     * @internal
     */
    function arrayFind(array, callback) {
        for (var i = 0; i < array.length; i++) {
            if (callback(array[i], i, array)) {
                return array[i];
            }
        }
    }
    /**
     * Polyfill for {@link Object.is}, checks whether two values are the same.
     * @param value1 The first value.
     * @param value2 The second value.
     * @returns Whether the values are the same.
     * @internal
     */
    function objectIs(value1, value2) {
        if (value1 === value2) {
            if (value1 !== 0) {
                return true;
            }
            else {
                return 1 / value1 === 1 / value2;
            }
        }
        return value1 !== value1 && value2 !== value2;
    }
    /**
     * Gets the index of an element in an array and compares elements using
     * {@link objectIs} to support -0 and NaN correctly.
     * @param array The array.
     * @param value The value.
     * @returns
     * @internal
     */
    function safeIndexOf(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (objectIs(array[i], value)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Gets the type of a value as a string and handles null correctly.
     * @param value The value.
     * @returns The type.
     * @internal
     */
    function safeTypeOf(value) {
        return value === null ? 'null' : typeof value;
    }
    /**
     * Checks whether a set of arguments are the correct types.
     * @param args The arguments.
     * @param types The types.
     * @returns Whether the arguments are the correct types.
     * @internal
     * ```ts
     * validateTypes(['a', 3], ['string', 'boolean']); // false
     * validateTypes(['a', 3], ['string', ['boolean', 'number']]); //true
     * ```
     */
    function validateTypes(args, types) {
        // For each argument, validate it against the type or types.
        for (var i = 0; i < args.length; i++) {
            if (Array.isArray(types[i])) {
                // If multiple types are provided, check if the argument matches
                // any of them.
                var matched = false;
                for (var j = 0; j < types[i].length; j++) {
                    if (safeTypeOf(args[i]) === types[i][j]) {
                        matched = true;
                    }
                }
                if (!matched) {
                    // If none of the types provided match, fail the validation.
                    return false;
                }
            }
            else {
                if (safeTypeOf(args[i]) !== types[i]) {
                    // If the type doesn't match, fail the validation.
                    return false;
                }
            }
        }
        // If all arguments are of the correct type, pass validation.
        return true;
    }
    /**
     * Checks whether a {@link GTAny} is a {@link GTObject}.
     * @param value The GTAny.
     * @returns Whether the GTAny is a GTObject.
     */
    function isGTObject(value) {
        return value[0].charAt(0) === value[0].charAt(0).toUpperCase();
    }
    /**
     * Gets a prototype definition by prototype.
     * @param prototype The prototype.
     * @returns The definition.
     * @internal
     */
    function getDefinitionByPrototype(prototype) {
        return arrayFind(prototypeDefinitions, function (definition) {
            return prototype === definition[0];
        });
    }
    /**
     * Gets a prototype definition by name.
     * @param name The name.
     * @returns The definition.
     * @internal
     */
    function getDefinitionByName(name) {
        return arrayFind(prototypeDefinitions, function (definition) {
            return name === definition[1];
        });
    }
    /**
     * Registers a prototype for serialization.
     * @param prototype The prototype.
     * @param name The name of the prototype.
     */
    function register(prototype, name) {
        // Check if arguments are valid.
        if (!validateTypes([prototype, name], ['object', ['string', 'undefined']])) {
            throw new TypeError('Invalid arguments, expected (prototype: object, name?: string)');
        }
        // Check if a name has been provided.
        if (!name) {
            if (Object.prototype.hasOwnProperty.call(prototype, 'constructor') &&
                Object.prototype.hasOwnProperty.call(prototype.constructor, 'name')) {
                // If the prototype has a constructor with a name property (ES6+
                // only), use that.
                name = prototype.constructor.name;
            }
            else {
                // If the prototype doesn't have a constructor with a name
                // property, throw an error.
                throw new Error('Prototype name not provided and could not be inferred');
            }
            // Using prototype.constructor.name is not supported in all
            // environments. In addition, if the code using this library
            // minifies its output, the names of constructors may change after
            // different compilations, breaking compatibility. Leaving out the
            // name parameter may be fine in some environments such as in a node
            // application without a bundler, so this warning can be suppressed
            // by setting config.inferPrototypeNames to true.
            if (!config.inferPrototypeNames) {
                console.warn('Prototype name not provided explicitly, falling back to ' + name);
                console.warn('This may cause compatibility problems!');
            }
        }
        var namePrefixed = '@' + name;
        // Check if the prototype has already been registered.
        if (getDefinitionByPrototype(prototype)) {
            throw new Error('Cannot register, prototype ' + name + 'is already registered');
        }
        // Check if the name is already registered with a different prototype.
        if (getDefinitionByName(namePrefixed)) {
            throw new Error('Cannot register, prototype name ' + name + ' is already in use');
        }
        // Add the definition.
        prototypeDefinitions.push([prototype, namePrefixed]);
    }
    /**
     * Serializes a value to a string.
     * @param value The value.
     * @returns The serialized string.
     */
    function serialize(value) {
        // To serialize a value, convert it to an array of GTAny values. If the
        // value is a primitive, the array will just have one value, containing
        // the mapped GTAny. If the value is an object, the first element of the
        // array will be a GTObject, and the remaining elements will be other
        // GTAny values. The GTAny values will then be converted to a string
        // using JSON.stringify.
        var knownValues = [];
        var mappedValues = [];
        // Add the value and return the mapped values as a string using
        // JSON.stringify.
        addValue(value);
        return JSON.stringify(mappedValues);
        /**
         * Adds a value to the known values and mapped values.
         * @param value The value.
         * @returns The index at which the value was added.
         * @internal
         */
        function addValue(value) {
            switch (safeTypeOf(value)) {
                case 'undefined':
                    return addUndefined();
                case 'null':
                    return addNull();
                case 'bigint':
                    return addBigInt(value);
                case 'boolean':
                    return addBoolean(value);
                case 'number':
                    return addNumber(value);
                case 'string':
                    return addString(value);
                case 'object':
                    return addObject(value);
                case 'symbol':
                    throw new TypeError('Symbols are not supported yet');
                case 'function':
                    throw new TypeError('Functions are not supported yet');
                default:
                    throw new TypeError('Unknown type ' + typeof value);
            }
        }
        /**
         * Adds undefined to the known values and mapped values.
         * @returns The index at which undefined was added.
         * @internal
         */
        function addUndefined() {
            knownValues.push(undefined);
            mappedValues.push(['undefined']);
            return knownValues.length - 1;
        }
        /**
         * Adds null to the known values and mapped values.
         * @returns The index at which null was added.
         * @internal
         */
        function addNull() {
            knownValues.push(undefined);
            mappedValues.push(['null']);
            return knownValues.length - 1;
        }
        /**
         * Adds a BigInt to the known values and mapped values.
         * @param bigint The BigInt.
         * @returns The index at which the BigInt was added.
         * @internal
         */
        function addBigInt(bigint) {
            knownValues.push(bigint);
            mappedValues.push(['bigint', String(bigint)]);
            return knownValues.length - 1;
        }
        /**
         * Adds a boolean to the known values and mapped values.
         * @param boolean The boolean.
         * @returns The index at which the boolean was added.
         * @internal
         */
        function addBoolean(boolean) {
            knownValues.push(boolean);
            mappedValues.push(['boolean', boolean]);
            return knownValues.length - 1;
        }
        /**
         * Adds a number to the known values and mapped values.
         * @param number The number.
         * @returns The index at which the number was added.
         * @internal
         */
        function addNumber(number) {
            knownValues.push(number);
            if (1 / number === 1 / -0) {
                // -0 is not converted to a string correctly.
                mappedValues.push(['number', '-0']);
            }
            else {
                mappedValues.push(['number', String(number)]);
            }
            return knownValues.length - 1;
        }
        /**
         * Adds a string to the known values and mapped values.
         * @param string The string.
         * @returns The index at which the string was added.
         * @internal
         */
        function addString(string) {
            knownValues.push(string);
            mappedValues.push(['string', string]);
            return knownValues.length - 1;
        }
        /**
         * Adds an object to the known values and mapped values.
         * @param object The object.
         * @returns The index at which the object was added.
         * @internal
         */
        function addObject(object) {
            // Get the corresponding definition if it exists.
            var definition = arrayFind(prototypeDefinitions, function (definition) {
                return definition[0] === Object.getPrototypeOf(object);
            });
            // Check if no definition was found and throw an error is
            // config.forceSerialization is false.
            if (!definition && !config.forceSerialization) {
                if (Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(object), 'constructor') &&
                    Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(object).constructor, 'name')) {
                    throw new Error('Could not serialize object with unregistered prototype ' +
                        Object.getPrototypeOf(object).constructor.name +
                        '.prototype');
                }
                else {
                    throw new Error('Could not serialize object with unregistered prototype');
                }
            }
            // Create the corresponding GTObject.
            var mapped;
            if (definition) {
                switch (Object.prototype.toString.call(object).slice(8, -1)) {
                    case 'Array':
                        mapped = ['Array', definition[1], []];
                        break;
                    case 'Date':
                        mapped = [
                            'Date',
                            definition[1],
                            [],
                            Date.prototype.valueOf.call(object),
                        ];
                        break;
                    case 'RegExp':
                        mapped = [
                            'RegExp',
                            definition[1],
                            [],
                            RegExp.prototype.toString.call(object),
                        ];
                        break;
                    case 'String':
                        mapped = [
                            'String',
                            definition[1],
                            [],
                            String.prototype.valueOf.call(object),
                        ];
                        break;
                    default:
                        mapped = ['Object', definition[1], []];
                }
            }
            else {
                // When config.forceSerialization is enabled, objects without a
                // definition become instances of Object.prototype.
                mapped = ['Object', 'Object', []];
            }
            // Push the object and GTObject to the known and mapped values.
            knownValues.push(object);
            mappedValues.push(mapped);
            // Record the index of the object so it can be returned later.
            var objectIndex = knownValues.length - 1;
            Object.getOwnPropertyNames(object).forEach(function (name) {
                // For each property on the object, get the corresponding
                // descriptor.
                var descriptor = Object.getOwnPropertyDescriptor(object, name);
                if (descriptor.get) {
                    throw new TypeError('Getters are not supported yet');
                }
                if (descriptor.set) {
                    throw new TypeError('Setters are not supported yet');
                }
                // Map the descriptor to a GTProperty. If the key or value is
                // already in the known values, it will simply get the index of
                // the value and add create the GTProperty with it. If the value
                // is unknown, it will add the value and then create the
                // GTProperty with the returned index.
                mapped[2].push([
                    safeIndexOf(knownValues, name) > -1
                        ? safeIndexOf(knownValues, name)
                        : addValue(name),
                    safeIndexOf(knownValues, descriptor.value) > -1
                        ? safeIndexOf(knownValues, descriptor.value)
                        : addValue(descriptor.value),
                    descriptor.configurable,
                    descriptor.enumerable,
                    descriptor.writable,
                ]);
            });
            return objectIndex;
        }
    }
    /**
     * Deserializes a string to a value.
     * @param value The serialized string.
     * @returns The value.
     */
    function deserialize(string) {
        var mappedValues = JSON.parse(string);
        var originalValues = [];
        mappedValues.forEach(function (value) {
            switch (value[0]) {
                case 'undefined':
                    originalValues.push(undefined);
                    break;
                case 'null':
                    originalValues.push(null);
                    break;
                case 'bigint':
                    originalValues.push(BigInt(value[1]));
                    break;
                case 'boolean':
                    originalValues.push(value[1]);
                    break;
                case 'number':
                    originalValues.push(Number(value[1]));
                    break;
                case 'string':
                    originalValues.push(value[1]);
                    break;
                default:
                    var definition = getDefinitionByName(value[1]);
                    var originalValue;
                    switch (value[0]) {
                        case 'Array':
                            originalValue = new Array();
                            break;
                        case 'Date':
                            originalValue = new Date(value[3]);
                            break;
                        case 'RegExp':
                            let lastSlashPosition = value[3].lastIndexOf('/');
                            let pattern = value[3].substring(1, lastSlashPosition);
                            let flags = value[3].substring(lastSlashPosition + 1);
                            originalValue = new RegExp(pattern, flags);
                            break;
                        case 'String':
                            originalValue = new String(value[3]);
                            break;
                        default:
                            originalValues.push(Object.create(definition[0]));
                    }
                    if (value[0] !== value[1]) {
                        if (Object.setPrototypeOf) {
                            Object.setPrototypeOf(originalValue, definition[0]);
                        }
                        else if (originalValue.__proto__) {
                            originalValue.__proto__ = definition[0];
                        }
                        else {
                            throw new TypeError('Could not deserialize RegExp with modified constructor, unsupported by environment');
                        }
                    }
                    originalValues.push(originalValue);
            }
        });
        mappedValues.forEach(function (value, index) {
            if (isGTObject(value)) {
                value[2].forEach(function (property) {
                    Object.defineProperty(originalValues[index], originalValues[property[0]], {
                        value: originalValues[property[1]],
                        configurable: property[2],
                        enumerable: property[3],
                        writable: property[4],
                    });
                });
            }
        });
        return originalValues[0];
    }
    return {
        config: config,
        register: register,
        serialize: serialize,
        deserialize: deserialize,
    };
})();
if (typeof window === 'undefined' || this !== window) {
    module.exports = GodTierSerializer;
}
