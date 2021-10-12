import { GTDataProperty, GTObject, GTProperty } from '../types/objects';
import { GTAny } from '../types/types';
import { safeTypeOf } from './utils';

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
	return value[0].charAt(0) === value[0].charAt(0).toUpperCase();
}

/**
 * Checks whether a {@link GTProperty} is a {@link GTDataProperty}.
 * @param value The GTProperty.
 * @returns Whether the GTProperty is a GTDataProperty.
 * @internal
 * ```ts
 * isGTDataProperty([1, 2, true, true, true]) // true
 * ```
 */
export function isGTDataProperty(value: GTProperty): value is GTDataProperty {
	return safeTypeOf(value[2]) === 'boolean';
}
