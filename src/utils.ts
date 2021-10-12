import { arrayFind, objectIs } from './polyfills';
import { definitions } from './references';
import { GTTypedArray } from './types';

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
export function safeIndexOf(array: any[], element: any) {
	for (let i = 0; i < array.length; i++) {
		if (objectIs(array[i], element)) {
			return i;
		}
	}
	return -1;
}

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
export function safeTypeOf(value: any) {
	if (value === null) {
		// Null normally evaluates incorrectly to 'object'.
		return 'null';
	} else if (typeof value === 'function') {
		// Functions normally evaluate incorrectly to 'function'.
		return 'object';
	} else {
		// TypeScript doesn't recognize that typeof will not return 'function'
		// so the output of the expression needs to be manually cast.
		return typeof value as
			| 'string'
			| 'number'
			| 'bigint'
			| 'boolean'
			| 'symbol'
			| 'undefined'
			| 'object'
			| 'null';
	}
}

/**
 * Gets the native type of an object as a string.
 * @param object The object.
 * @returns The native type of the object.
 * @internal
 * ```ts
 * objectTypeOf([]) // 'Array'
 * ```
 */
export function objectTypeOf(object: object) {
	if (typeof Symbol !== 'undefined') {
		// Check if the toStringTag was overwritten.
		if (
			Object.getOwnPropertySymbols(Object.getPrototypeOf(object)).indexOf(
				Symbol.toStringTag
			) > -1
		) {
			return 'Object';
		}
	}
	return Object.prototype.toString.call(object).slice(8, -1);
}

/**
 * Gets an object definition from an identifier.
 * @param identifier The identifier.
 * @returns The object definition.
 * @internal
 * ```ts
 * getDefinitionByIdentifier('@Foo') // [{}, '@Foo']
 * ```
 */
export function getDefinitionByIdentifier(identifier: string) {
	return arrayFind(definitions, (definition) => identifier === definition[1]);
}

/**
 * Gets an object definition from an object.
 * @param value The object.
 * @returns The object definition.
 * @internal
 * ```ts
 * getDefinitionByObject({}) // [{}, '@Foo']
 * ```
 */
export function getDefinitionByValue(value: any) {
	return arrayFind(definitions, (definition) => value === definition[0]);
}

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
export function numberToString(number: number) {
	return objectIs(number, -0) ? '-0' : String(number);
}

export function structureTypedArray(
	typedArray: object,
	constructor: any
): GTTypedArray {
	return [
		constructor.name,
		0,
		[],
		constructor.prototype.toString.call(typedArray).split(',').length,
	];
}
