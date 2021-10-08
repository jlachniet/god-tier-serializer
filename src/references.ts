import { config } from '.';
import {
	getDefinitionByIdentifier,
	getDefinitionByObject,
	safeTypeOf,
} from './utils';

/**
 * A definition consisting of an object and an identifier.
 */
type ObjectDefinition = [
	/**
	 * The object.
	 */
	object: object,
	/**
	 * The identifier.
	 */
	identifier: string
];

export const definitions: ObjectDefinition[] = [
	[Object.prototype, 'Object'],
	[Array.prototype, 'Array'],
	[BigInt.prototype, 'BigInt'],
	[Boolean.prototype, 'Boolean'],
	[Date.prototype, 'Date'],
	[Int8Array.prototype, 'Int8Array'],
	[Number.prototype, 'Number'],
	[RegExp.prototype, 'RegExp'],
	[String.prototype, 'String'],
];

/**
 * Registers an object with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param object The object.
 * @param identifier The identifier.
 */
export function register(object: object, identifier?: string) {
	// Validate that the arguments are of the correct types.
	if (
		safeTypeOf(object) !== 'object' ||
		(safeTypeOf(identifier) !== 'string' &&
			safeTypeOf(identifier) !== 'undefined')
	) {
		throw new TypeError(
			'register called with invalid arguments, expected (object, string?) but got (' +
				safeTypeOf(object) +
				', ' +
				safeTypeOf(identifier) +
				')'
		);
	}

	if (identifier === undefined) {
		if (object.constructor && object.constructor.name) {
			if (!config.inferIdentifiers) {
				throw new TypeError(
					'register called without an identifier, pass as identifier or set config.inferIdentifiers to true'
				);
			}

			identifier = object.constructor.name;
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
	if (getDefinitionByObject(object)) {
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

	definitions.push([object, identifier]);
}
