import { arrayFind } from './polyfills';
import {
	GTAny,
	GTArray,
	GTBigInt,
	GTBoolean,
	GTConfig,
	GTDate,
	GTNull,
	GTNumber,
	GTObject,
	GTRegExp,
	GTStandardObject,
	GTString,
	GTStringObject,
	GTUndefined,
	PrototypeDefinition,
} from './types';
import { safeIndexOf, safeTypeOf, validateTypes } from './utils';

export var config: GTConfig = {
	forceSerialization: false,
	inferPrototypeNames: false,
};

var prototypeDefinitions: PrototypeDefinition[] = [
	[null, 'null'],
	[Object.prototype, 'Object'],
	[Array.prototype, 'Array'],
	[Date.prototype, 'Date'],
	[RegExp.prototype, 'RegExp'],
	[String.prototype, 'String'],
];

/**
 * Checks whether a {@link GTAny} is a {@link GTObject}.
 * @param value The GTAny.
 * @returns Whether the GTAny is a GTObject.
 */
function isGTObject(value: GTAny): value is GTObject {
	return value.length >= 3;
}

/**
 * Gets a prototype definition by prototype.
 * @param prototype The prototype.
 * @returns The definition.
 * @internal
 */
function getDefinitionByPrototype(prototype: object | null) {
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
function getDefinitionByName(name: string) {
	return arrayFind(prototypeDefinitions, function (definition) {
		return name === definition[1];
	});
}

/**
 * Registers a prototype for serialization.
 * @param prototype The prototype.
 * @param name The name of the prototype.
 */
export function register(prototype: object, name?: string) {
	// Check if arguments are valid.
	if (!validateTypes([prototype, name], ['object', ['string', 'undefined']])) {
		throw new TypeError(
			'Invalid arguments, expected (prototype: object, name?: string)'
		);
	}

	// Check if a name has been provided.
	if (!name) {
		if (
			Object.prototype.hasOwnProperty.call(prototype, 'constructor') &&
			Object.prototype.hasOwnProperty.call(prototype.constructor, 'name')
		) {
			// If the prototype has a constructor with a name property (ES6+
			// only), use that.
			name = prototype.constructor.name;
		} else {
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
			console.warn(
				'Prototype name not provided explicitly, falling back to ' + name
			);
			console.warn('This may cause compatibility problems!');
		}
	}

	var namePrefixed = '@' + name;

	// Check if the prototype has already been registered.
	if (getDefinitionByPrototype(prototype)) {
		throw new Error(
			'Cannot register, prototype ' + name + 'is already registered'
		);
	}

	// Check if the name is already registered with a different prototype.
	if (getDefinitionByName(namePrefixed)) {
		throw new Error(
			'Cannot register, prototype name ' + name + ' is already in use'
		);
	}

	// Add the definition.
	prototypeDefinitions.push([prototype, namePrefixed]);
}

/**
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized string.
 */
export function serialize(value: any) {
	// To serialize a value, convert it to an array of GTAny values. If the
	// value is a primitive, the array will just have one value, containing
	// the mapped GTAny. If the value is an object, the first element of the
	// array will be a GTObject, and the remaining elements will be other
	// GTAny values. The GTAny values will then be converted to a string
	// using JSON.stringify.

	var knownValues: any[] = [];
	var mappedValues: GTAny[] = [];

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
	function addValue(value: any) {
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
		mappedValues.push(['undefined'] as GTUndefined);
		return knownValues.length - 1;
	}

	/**
	 * Adds null to the known values and mapped values.
	 * @returns The index at which null was added.
	 * @internal
	 */
	function addNull() {
		knownValues.push(undefined);
		mappedValues.push(['null'] as GTNull);
		return knownValues.length - 1;
	}

	/**
	 * Adds a BigInt to the known values and mapped values.
	 * @param bigint The BigInt.
	 * @returns The index at which the BigInt was added.
	 * @internal
	 */
	function addBigInt(bigint: BigInt) {
		knownValues.push(bigint);
		mappedValues.push(['bigint', String(bigint)] as GTBigInt);
		return knownValues.length - 1;
	}

	/**
	 * Adds a boolean to the known values and mapped values.
	 * @param boolean The boolean.
	 * @returns The index at which the boolean was added.
	 * @internal
	 */
	function addBoolean(boolean: boolean) {
		knownValues.push(boolean);
		mappedValues.push(['boolean', boolean] as GTBoolean);
		return knownValues.length - 1;
	}

	/**
	 * Adds a number to the known values and mapped values.
	 * @param number The number.
	 * @returns The index at which the number was added.
	 * @internal
	 */
	function addNumber(number: number) {
		knownValues.push(number);
		if (1 / number === 1 / -0) {
			// -0 is not converted to a string correctly.
			mappedValues.push(['number', '-0']);
		} else {
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
	function addString(string: string) {
		knownValues.push(string);
		mappedValues.push(['string', string] as GTString);
		return knownValues.length - 1;
	}

	/**
	 * Adds an object to the known values and mapped values.
	 * @param object The object.
	 * @returns The index at which the object was added.
	 * @internal
	 */
	function addObject(object: object) {
		// Get the corresponding definition if it exists.
		var definition = arrayFind(prototypeDefinitions, function (definition) {
			return definition[0] === Object.getPrototypeOf(object);
		});

		// Check if no definition was found and throw an error is
		// config.forceSerialization is false.
		if (!definition && !config.forceSerialization) {
			if (
				Object.prototype.hasOwnProperty.call(
					Object.getPrototypeOf(object),
					'constructor'
				) &&
				Object.prototype.hasOwnProperty.call(
					Object.getPrototypeOf(object).constructor,
					'name'
				)
			) {
				throw new Error(
					'Could not serialize object with unregistered prototype ' +
						Object.getPrototypeOf(object).constructor.name +
						'.prototype'
				);
			} else {
				throw new Error(
					'Could not serialize object with unregistered prototype'
				);
			}
		}

		// Create the corresponding GTObject.
		var mapped: GTObject;
		if (definition) {
			switch (Object.prototype.toString.call(object).slice(8, -1)) {
				case 'Array':
					mapped = ['Array', definition[1], []] as GTArray;
					break;
				case 'Date':
					mapped = [
						'Date',
						definition[1],
						[],
						Date.prototype.valueOf.call(object) as number,
					] as GTDate;
					break;
				case 'RegExp':
					mapped = [
						'RegExp',
						definition[1],
						[],
						RegExp.prototype.toString.call(object) as string,
					] as GTRegExp;
					break;
				case 'String':
					mapped = [
						'String',
						definition[1],
						[],
						String.prototype.valueOf.call(object) as string,
					] as GTStringObject;
					break;
				default:
					mapped = ['Object', definition[1], []] as GTStandardObject;
			}
		} else {
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
			var descriptor = Object.getOwnPropertyDescriptor(object, name)!;
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
				descriptor.configurable!,
				descriptor.enumerable!,
				descriptor.writable!,
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
export function deserialize(string: string): unknown {
	var mappedValues = JSON.parse(string) as GTAny[];
	var originalValues = [] as any[];

	mappedValues.forEach(function (value) {
		switch (value[0]) {
			case 'undefined':
				originalValues.push(undefined);
				break;
			case 'null':
				originalValues.push(null);
				break;
			case 'bigint':
				originalValues.push(BigInt((value as GTBigInt)[1]));
				break;
			case 'boolean':
				originalValues.push((value as GTBoolean)[1]);
				break;
			case 'number':
				originalValues.push(Number((value as GTNumber)[1]));
				break;
			case 'string':
				originalValues.push((value as GTString)[1]);
				break;
			default:
				var definition = getDefinitionByName((value as GTObject)[1])!;
				var originalValue: any;
				var isStandardObject = false;

				switch (value[0]) {
					case 'Array':
						originalValue = new Array();
						break;
					case 'Date':
						originalValue = new Date(value[3]);
						break;
					case 'RegExp':
						var lastSlashPosition = value[3].lastIndexOf('/');
						var pattern = value[3].substring(1, lastSlashPosition);
						var flags = value[3].substring(lastSlashPosition + 1);

						originalValue = new RegExp(pattern, flags);
						break;
					case 'String':
						originalValue = new String(value[3]);
						break;
					default:
						originalValue = Object.create(definition[0]);
						isStandardObject = true;
				}

				if (!isStandardObject && value[0] !== value[1]) {
					if (Object.setPrototypeOf) {
						Object.setPrototypeOf(originalValue, definition[0]);
					} else if ((originalValue as any).__proto__) {
						(originalValue as any).__proto__ = definition[0];
					} else {
						throw new TypeError(
							'Could not deserialize RegExp with modified constructor, unsupported by environment'
						);
					}
				}

				originalValues.push(originalValue);
		}
	});

	mappedValues.forEach(function (value, index) {
		if (isGTObject(value)) {
			value[2].forEach(function (property) {
				Object.defineProperty(
					originalValues[index],
					originalValues[property[0]],
					{
						value: originalValues[property[1]],
						configurable: property[2],
						enumerable: property[3],
						writable: property[4],
					}
				);
			});
		}
	});

	return originalValues[0];
}
