import { GTObject } from './objects';
import { GTPrimitive } from './primitives';

/**
 * A value structured for serialization.
 */
export type GTAny = GTPrimitive | GTObject | GTReference;

/**
 * A reference to an external value.
 */
export type GTReference = [
	/**
	 * The type of the value.
	 */
	type: 'reference',
	/**
	 * The identifier of the value.
	 */
	identifier: string
];
