import { arrayFind, objectIs } from '../polyfills';
import { definitions } from '../references';
import { GTTypedArray } from '../types';

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
			| 'undefined'
			| 'null'
			| 'boolean'
			| 'number'
			| 'string'
			| 'bigint'
			| 'symbol'
			| 'object';
	}
}

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
export function objectTypeOf(object: object) {
	if (typeof Symbol !== 'undefined') {
		// Check if Symbol.toStringTag was set on the object. It is assumed that
		// this will only ever happen on user-created objects, and not on
		// built-in objects.
		if ((object as any)[Symbol.toStringTag] !== undefined) {
			return 'Object';
		}
	}
	return Object.prototype.toString.call(object).slice(8, -1);
}

/**
 * Gets a value definition from an identifier.
 * @param identifier The identifier.
 * @returns The value definition.
 * @internal
 * ```ts
 * getDefinitionByIdentifier('Foo') // [{}, 'Foo']
 * ```
 */
export function getDefinitionByIdentifier(identifier: string) {
	return arrayFind(definitions, (definition) => identifier === definition[1]);
}

/**
 * Gets a value definition from a value.
 * @param value The value.
 * @returns The value definition.
 * @internal
 * ```ts
 * getDefinitionByValue({}) // [{}, 'Foo']
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

/**
 * Creates a {@link GTTypedArray} with no properties from a typed array and a
 * TypedArray constructor.
 * @param typedArray The typed array.
 * @param constructor The constructor.
 * @returns
 * @internal
 */
export function getTypedArrayTemplate(
	typedArray: object,
	constructor:
		| Int8ArrayConstructor
		| Uint8ArrayConstructor
		| Uint8ClampedArrayConstructor
		| Int16ArrayConstructor
		| Uint16ArrayConstructor
		| Int32ArrayConstructor
		| Uint32ArrayConstructor
		| Float32ArrayConstructor
		| Float64ArrayConstructor
		| BigInt64ArrayConstructor
		| BigUint64ArrayConstructor
): GTTypedArray {
	return [
		constructor.name as
			| 'Int8Array'
			| 'Uint8Array'
			| 'Uint8ClampedArray'
			| 'Int16Array'
			| 'Uint16Array'
			| 'Int32Array'
			| 'Uint32Array'
			| 'Float32Array'
			| 'Float64Array'
			| 'BigInt64Array'
			| 'BigUint64Array',
		0,
		[],
		constructor.prototype.toString.call(typedArray).split(',').length,
	];
}
