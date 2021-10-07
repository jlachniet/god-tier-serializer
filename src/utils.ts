import { arrayFind, objectIs } from './polyfills';
import { definitions } from './references';
import { GTAny, GTObject } from './types';

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
	for (var i = 0; i < array.length; i++) {
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
 * objectTypeOf([]) // 'array'
 * ```
 */
export function objectTypeOf(object: object) {
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
	return arrayFind(definitions, function (definition) {
		return identifier === definition[1];
	});
}

/**
 * Gets an object definition from an object.
 * @param object The object.
 * @returns The object definition.
 * @internal
 * ```ts
 * getDefinitionByObject({}) // [{}, '@Foo']
 * ```
 */
export function getDefinitionByObject(object: object) {
	return arrayFind(definitions, function (definition) {
		return object === definition[0];
	});
}

/**
 * Checks whether a {@link GTAny} is a {@link GTObject}.
 * @param value The GTAny.
 * @returns Whether the GTAny is a GTObject.
 * @internal
 * ```ts
 * isGTObject(['number', '3']) // false
 * ```
 */
export function isGTObject(value: GTAny): value is GTObject {
	// GTPrimitive values all have 1 or 2 elements, and GTObjects all have 3 or
	// more elements.
	return value.length > 2;
}
