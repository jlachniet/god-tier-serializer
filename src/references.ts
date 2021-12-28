import { config } from '.';
import {
	getDefinitionByIdentifier,
	getDefinitionByValue,
	safeTypeOf,
} from './utils/utils';

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

// An array of definitions used during serialization and deserialization.
export const definitions: ValueDefinition[] = [];
let areBuiltInsRegistered = false;

/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
export function register(value: any, identifier?: string) {
	if (!areBuiltInsRegistered) {
		registerBuiltIns();
	}

	// Validate that the arguments are the correct types.
	if (
		safeTypeOf(identifier) !== 'string' &&
		safeTypeOf(identifier) !== 'undefined'
	) {
		throw new TypeError(
			`register called with invalid arguments, expected (any, string?) but got (${safeTypeOf(
				value
			)}, ${safeTypeOf(identifier)})`
		);
	}

	// If no identifier is provided, try to infer it.
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

	// Check if the identifier is already registered.
	if (getDefinitionByIdentifier(identifier!)) {
		// If it is, update the value.
		getDefinitionByIdentifier(identifier!)![0] = value;
	} else {
		// Otherwise, create a new definition.
		definitions.push([value, identifier!]);
	}
}

export function registerBuiltIns() {
	if (areBuiltInsRegistered) {
		return;
	}

	// Not true yet, but necessary to prevent this function from being executed
	// again.
	areBuiltInsRegistered = true;

	// Add ES5 compatible definitions.
	register(Object.prototype, 'Object');
	register(Array.prototype, 'Array');
	register(Boolean.prototype, 'Boolean');
	register(Date.prototype, 'Date');
	register(Number.prototype, 'Number');
	register(RegExp.prototype, 'RegExp');
	register(String.prototype, 'String');

	// Add definitions for built-in types that are not supported by all
	// environments, such as typed arrays, maps, sets, etc.
	typeof Int8Array !== 'undefined' &&
		register(Int8Array.prototype, 'Int8Array');
	typeof Uint8Array !== 'undefined' &&
		register(Uint8Array.prototype, 'Uint8Array');
	typeof Uint8ClampedArray !== 'undefined' &&
		register(Uint8ClampedArray.prototype, 'Uint8ClampedArray');
	typeof Int16Array !== 'undefined' &&
		register(Int16Array.prototype, 'Int16Array');
	typeof Uint16Array !== 'undefined' &&
		register(Uint16Array.prototype, 'Uint16Array');
	typeof Int32Array !== 'undefined' &&
		register(Int32Array.prototype, 'Int32Array');
	typeof Uint32Array !== 'undefined' &&
		register(Uint32Array.prototype, 'Uint32Array');
	typeof Float32Array !== 'undefined' &&
		register(Float32Array.prototype, 'Float32Array');
	typeof Float64Array !== 'undefined' &&
		register(Float64Array.prototype, 'Float64Array');
	typeof BigInt64Array !== 'undefined' &&
		register(BigInt64Array.prototype, 'BigInt64Array');
	typeof BigUint64Array !== 'undefined' &&
		register(BigUint64Array.prototype, 'BigUint64Array');
	typeof BigInt !== 'undefined' && register(BigInt.prototype, 'BigInt');
	typeof Map !== 'undefined' && register(Map.prototype, 'Map');
	typeof Set !== 'undefined' && register(Set.prototype, 'Set');
	typeof Symbol !== 'undefined' && register(Symbol.prototype, 'Symbol');
}
