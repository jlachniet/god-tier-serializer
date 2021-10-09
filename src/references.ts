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
	[BigInt.prototype, 'BigInt'],
	[Boolean.prototype, 'Boolean'],
	[Date.prototype, 'Date'],
	[Int8Array.prototype, 'Int8Array'],
	[Uint8Array.prototype, 'Uint8Array'],
	[Uint8ClampedArray.prototype, 'Uint8ClampedArray'],
	[Int16Array.prototype, 'Int16Array'],
	[Uint16Array.prototype, 'Uint16Array'],
	[Int32Array.prototype, 'Int32Array'],
	[Uint32Array.prototype, 'Uint32Array'],
	[Float32Array.prototype, 'Float32Array'],
	[Float64Array.prototype, 'Float64Array'],
	[BigInt64Array.prototype, 'BigInt64Array'],
	[BigUint64Array.prototype, 'BigUint64Array'],
	[Map.prototype, 'Map'],
	[Number.prototype, 'Number'],
	[RegExp.prototype, 'RegExp'],
	[Set.prototype, 'Set'],
	[String.prototype, 'String'],
];

/**
 * Registers an object with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The object.
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

	// Prepend an at sign character to the identifier to prevent collisions with
	// built-in objects.
	identifier = '@' + identifier;

	// Check if the object is already registered.
	if (getDefinitionByValue(value)) {
		throw new Error(
			'register called with an object that is already registered'
		);
	}

	// Check if the identifier is already registered.
	if (getDefinitionByIdentifier(identifier)) {
		throw new Error(
			'register called with an identifier that is already registered'
		);
	}

	definitions.push([value, identifier]);
}
