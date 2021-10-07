import { config } from './config';
import { GTAny, GTObject } from './types';
import {
	getDefinitionByObject,
	numberToString,
	objectTypeOf,
	safeIndexOf,
	safeTypeOf,
} from './utils';

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
	// itself recursively to handle its children and prototype, so once this
	// call is done, both arrays will most likely contain several values.
	mapValue(value);

	// Return the mapped values as text.
	return JSON.stringify(mappedValues);

	/**
	 * Converts a value to a {@link GTAny} and adds the original value to
	 * {@link knownValues} and the converted value to {@Link mappedValues}.
	 * @param value The value.
	 * @returns The index at which the value was added.
	 * @internal
	 */
	function mapValue(value: any) {
		if (safeIndexOf(knownValues, value) > -1) {
			// If the value is already mapped, return the index of the value.
			return safeIndexOf(knownValues, value);
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
			case 'object':
				return mapObject(value);
			default:
				throw new TypeError(
					'Failed to serialize value with unknown type ' + safeTypeOf(value)
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
	 * Adds an object to the known and mapped values.
	 * @param object The object.
	 * @returns The index at which the object was added.
	 * @internal
	 */
	function mapObject(object: object) {
		// Add the object to the known values and record its position so it can
		// be returned later.
		knownValues.push(object);
		const position = knownValues.length - 1;

		// Check if there is a corresponding definition for the object.
		const definition = getDefinitionByObject(object);

		if (definition) {
			// If there is a definition, return a GTReference with the
			// identifier.
			mappedValues.push(['reference', definition[1]]);
		} else {
			// Create a GTObject and add it to the mapped values. The GTObject
			// will have its properties set later, for now it just needs to
			// reserve a position in the mapped values.
			let mappedObj: GTObject;

			switch (objectTypeOf(object)) {
				case 'Array':
					mappedObj = ['Array', 0, []];
					break;
				case 'Boolean':
					mappedObj = [
						'Boolean',
						0,
						[],
						Boolean.prototype.valueOf.call(object),
					];
					break;
				case 'Date':
					mappedObj = ['Date', 0, [], Date.prototype.valueOf.call(object)];
					break;
				case 'Function':
					throw new Error('Could not serialize unregistered function');
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
				default:
					mappedObj = ['Object', 0, []];
					break;
			}

			mappedValues.push(mappedObj);

			// Map the object's prototype and set the index.
			if (
				Object.getPrototypeOf(object) !== null &&
				!getDefinitionByObject(Object.getPrototypeOf(object)) &&
				!config.serializePrototypes
			) {
				throw new Error(
					'Could not serialize value with unregistered prototype, register the prototype or set config.serializePrototypes to true'
				);
			}
			mappedObj[1] = mapValue(Object.getPrototypeOf(object));

			Object.getOwnPropertyNames(object).forEach((name) => {
				// For each property on the object, get the descriptor and add a
				// GTProperty to the GTObject based on it.
				const descriptor = Object.getOwnPropertyDescriptor(object, name)!;
				mappedObj[2].push([
					mapValue(name),
					mapValue(descriptor.value),
					descriptor.configurable!,
					descriptor.enumerable!,
					descriptor.writable!,
				]);
			});
		}

		// Return the position at which the object was added.
		return position;
	}
}
