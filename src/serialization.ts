import { config } from './config';
import { GTMap, GTObject, GTSet } from './types/objects';
import { GTAny } from './types/types';
import {
	getDefinitionByValue,
	getTypedArrayTemplate,
	numberToString,
	objectTypeOf,
	safeIndexOf,
	safeTypeOf,
} from './utils/utils';

/**
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized value.
 */
export function serialize(value: any) {
	// To serialize a value, it must converted to an array of GTAny values.
	// Create a list of known values consisting of regular values, and an array
	// of mapped values consisting of the equivalent GTAny values.
	const knownValues: any[] = [];
	const mappedValues: GTAny[] = [];

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
	function mapValue(value: any, path: string) {
		if (safeIndexOf(knownValues, value) > -1) {
			// If the value is already mapped, return the index of the value.
			return safeIndexOf(knownValues, value);
		}

		// See if the value is registered, and return a GTReference if it is.
		const definition = getDefinitionByValue(value);
		if (definition) {
			knownValues.push(value);
			mappedValues.push(['reference', definition[1]]);
			return knownValues.length - 1;
		}

		// Call the appropriate function to map the value depending on the type
		// of the value.
		switch (safeTypeOf(value)) {
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
				throw new TypeError(
					`Failed to serialize value with unknown type ${safeTypeOf(value)}`
				);
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
	function mapBoolean(boolean: boolean) {
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
	function mapNumber(number: number) {
		knownValues.push(number);
		mappedValues.push(['number', numberToString(number)]);
		return knownValues.length - 1;
	}

	/**
	 * Adds a string to the known and mapped values.
	 * @param string The string.
	 * @returns The index at which the string was added.
	 * @internal
	 */
	function mapString(string: string) {
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
	function mapBigInt(bigint: BigInt) {
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
	function mapSymbol(symbol: symbol) {
		knownValues.push(symbol);

		if (Symbol.keyFor(symbol) === undefined) {
			mappedValues.push(['symbol', symbol.description!]);
		} else {
			mappedValues.push(['symbol', symbol.description!, Symbol.keyFor(symbol)]);
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
	function mapObject(object: object, path: string) {
		// Add the object to the known values and record its position so it can
		// be returned later.
		knownValues.push(object);
		const position = knownValues.length - 1;

		// Create a GTObject and add it to the mapped values. The GTObject
		// will have its properties set later, for now it just needs to
		// reserve a position in the mapped values.
		let mappedObj: GTObject;

		switch (objectTypeOf(object)) {
			case 'AsyncFunction':
			case 'AsyncGeneratorFunction':
			case 'Function':
			case 'GeneratorFunction':
				throw new Error(`Could not serialize unregistered function at ${path}`);
			case 'BigInt':
				mappedObj = [
					'BigInt',
					0,
					[],
					String(BigInt.prototype.valueOf.call(object)),
				];
				break;
			case 'Boolean':
				mappedObj = ['Boolean', 0, [], Boolean.prototype.valueOf.call(object)];
				break;
			case 'Date':
				mappedObj = ['Date', 0, [], Date.prototype.valueOf.call(object)];
				break;
			case 'Number':
				mappedObj = [
					'Number',
					0,
					[],
					numberToString(Number.prototype.valueOf.call(object)),
				];
				break;
			case 'RegExp':
				mappedObj = ['RegExp', 0, [], RegExp.prototype.toString.call(object)];
				break;
			case 'String':
				mappedObj = ['String', 0, [], String.prototype.valueOf.call(object)];
				break;
			case 'Symbol':
				const symbol = Symbol.prototype.valueOf.call(object);
				const description = String(symbol).substring(
					7,
					String(symbol).length - 1
				);

				if (Symbol.keyFor(symbol) === undefined) {
					mappedObj = ['Symbol', 0, [], description];
				} else {
					mappedObj = ['Symbol', 0, [], description, Symbol.keyFor(symbol)];
				}
				break;
			case 'Array':
				mappedObj = ['Array', 0, []];
				break;
			case 'Int8Array':
				mappedObj = getTypedArrayTemplate(object, Int8Array);
				break;
			case 'Uint8Array':
				mappedObj = getTypedArrayTemplate(object, Uint8Array);
				break;
			case 'Uint8ClampedArray':
				mappedObj = getTypedArrayTemplate(object, Uint8ClampedArray);
				break;
			case 'Int16Array':
				mappedObj = getTypedArrayTemplate(object, Int16Array);
				break;
			case 'Uint16Array':
				mappedObj = getTypedArrayTemplate(object, Uint16Array);
				break;
			case 'Int32Array':
				mappedObj = getTypedArrayTemplate(object, Int32Array);
				break;
			case 'Uint32Array':
				mappedObj = getTypedArrayTemplate(object, Uint32Array);
				break;
			case 'Float32Array':
				mappedObj = getTypedArrayTemplate(object, Float32Array);
				break;
			case 'Float64Array':
				mappedObj = getTypedArrayTemplate(object, Float64Array);
				break;
			case 'BigInt64Array':
				mappedObj = getTypedArrayTemplate(object, BigInt64Array);
				break;
			case 'BigUint64Array':
				mappedObj = getTypedArrayTemplate(object, BigUint64Array);
				break;
			case 'Map':
				mappedObj = ['Map', 0, [], []];
				break;
			case 'Set':
				mappedObj = ['Set', 0, [], []];
				break;
			default:
				mappedObj = ['Object', 0, []];
		}

		mappedValues.push(mappedObj);

		// Map the object's prototype and set the index.
		if (
			Object.getPrototypeOf(object) !== null &&
			!getDefinitionByValue(Object.getPrototypeOf(object)) &&
			!config.serializePrototypes
		) {
			throw new Error(
				`Could not serialize value with unregistered prototype at ${path}`
			);
		}
		mappedObj[1] = mapValue(Object.getPrototypeOf(object), '');

		let keys = Object.getOwnPropertyNames(object) as (string | symbol)[];
		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(object));
		}

		keys.forEach((key) => {
			// For each property on the object, get the descriptor and add a
			// GTProperty to the GTObject based on it.
			const descriptor = Object.getOwnPropertyDescriptor(object, key)!;
			if (descriptor.get || descriptor.set) {
				mappedObj[2].push([
					mapValue(key, ''),
					mapValue(descriptor.get, `${path}["${String(key)}" getter]`),
					mapValue(descriptor.set, `${path}["${String(key)}" setter]`),
					descriptor.configurable!,
					descriptor.enumerable!,
				]);
			} else {
				mappedObj[2].push([
					mapValue(key, ''),
					mapValue(descriptor.value, `${path}["${String(key)}"]`),
					descriptor.configurable!,
					descriptor.enumerable!,
					descriptor.writable!,
				]);
			}
		});

		if (mappedObj[0] === 'Map') {
			let i = 0;
			Map.prototype.forEach.call(object, (value, key) => {
				(mappedObj as GTMap)[3].push([
					mapValue(key, `${path} key#${i}`),
					mapValue(value, `${path} val#${i}`),
				]);
				i++;
			});
		}

		if (mappedObj[0] === 'Set') {
			let i = 0;
			Set.prototype.forEach.call(object, (value) => {
				(mappedObj as GTSet)[3].push(mapValue(value, `${path} val#${i}`));
				i++;
			});
		}

		// Return the position at which the object was added.
		return position;
	}
}
