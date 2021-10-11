import { config } from '.';
import {
	getDefinitionByIdentifier,
	getDefinitionByValue as getDefinitionByValue,
	safeTypeOf,
} from './utils';

/**
 * A definition consisting of a value and an identifier.
 */
type ValueDefinition = [
	/**
	 * The value.
	 */
	value: any,
	/**
	 * The identifier.
	 */
	identifier: string
];

export const definitions: ValueDefinition[] = [
	[Object.prototype, 'Object'],
	[Array.prototype, 'Array'],
	[Boolean.prototype, 'Boolean'],
	[Date.prototype, 'Date'],
	[Number.prototype, 'Number'],
	[RegExp.prototype, 'RegExp'],
	[String.prototype, 'String'],
];

typeof Int8Array !== 'undefined' &&
	definitions.push([Int8Array.prototype, 'Int8Array']);
typeof Uint8Array !== 'undefined' &&
	definitions.push([Uint8Array.prototype, 'Uint8Array']);
typeof Uint8ClampedArray !== 'undefined' &&
	definitions.push([Uint8ClampedArray.prototype, 'Uint8ClampedArray']);
typeof Int16Array !== 'undefined' &&
	definitions.push([Int16Array.prototype, 'Int16Array']);
typeof Uint16Array !== 'undefined' &&
	definitions.push([Uint16Array.prototype, 'Uint16Array']);
typeof Int32Array !== 'undefined' &&
	definitions.push([Int32Array.prototype, 'Int32Array']);
typeof Uint32Array !== 'undefined' &&
	definitions.push([Uint32Array.prototype, 'Uint32Array']);
typeof Float32Array !== 'undefined' &&
	definitions.push([Float32Array.prototype, 'Float32Array']);
typeof Float64Array !== 'undefined' &&
	definitions.push([Float64Array.prototype, 'Float64Array']);
typeof BigInt64Array !== 'undefined' &&
	definitions.push([BigInt64Array.prototype, 'BigInt64Array']);
typeof BigUint64Array !== 'undefined' &&
	definitions.push([BigUint64Array.prototype, 'BigUint64Array']);
typeof BigInt !== 'undefined' && definitions.push([BigInt.prototype, 'BigInt']);
typeof Map !== 'undefined' && definitions.push([Map.prototype, 'Map']);
typeof Set !== 'undefined' && definitions.push([Set.prototype, 'Set']);
typeof Symbol !== 'undefined' && definitions.push([Symbol.prototype, 'Symbol']);

/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
export function register(value: any, identifier?: string) {
	// Validate that the arguments are of the correct types.
	if (
		safeTypeOf(identifier) !== 'string' &&
		safeTypeOf(identifier) !== 'undefined'
	) {
		throw new TypeError(
			'register called with invalid arguments, expected (any, string?) but got (' +
				safeTypeOf(value) +
				', ' +
				safeTypeOf(identifier) +
				')'
		);
	}

	if (identifier === undefined) {
		if (value.constructor && value.constructor.name) {
			if (!config.inferIdentifiers) {
				throw new TypeError(
					'register called without an identifier, pass as identifier or set config.inferIdentifiers to true'
				);
			}

			identifier = value.constructor.name;
		} else {
			throw new Error(
				'register called without an identifier, and the identifier could not be inferred'
			);
		}
	}

	// Check if the object is already registered.
	if (getDefinitionByValue(value)) {
		throw new Error(
			'register called with an object that is already registered'
		);
	}

	// Check if the identifier is already registered.
	if (getDefinitionByIdentifier(identifier!)) {
		throw new Error(
			'register called with an identifier that is already registered'
		);
	}

	definitions.push([value, identifier!]);
}
