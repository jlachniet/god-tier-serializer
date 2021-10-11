/**
 * Polyfill for {@link Array.prototype.find}, gets the first element in an array
 * that satisfies a given condition.
 * @param array The array.
 * @param callback The callback.
 * @returns The first element in the array that satisfies the condition.
 * @internal
 * ```ts
 * arrayFind([1, 2, 3], (element) => element == 2) // 2
 * ```
 */
export function arrayFind<T>(array: T[], callback: arrayFindCallback<T>) {
	for (let i = 0; i < array.length; i++) {
		if (callback(array[i], i, array)) {
			return array[i];
		}
	}
}

/**
 * An {@link arrayFind} callback.
 */
type arrayFindCallback<T> = (
	/**
	 * The element.
	 */
	element: T,
	/**
	 * The index.
	 */
	index: number,
	/**
	 * The array.
	 */
	array: T[]
) => boolean;

/**
 * Polyfill for {@link Object.is}, determines whether two values are the same.
 * @param value1 The first value.
 * @param value2 The second value.
 * @returns Whether the values are the same.
 * @internal
 * ```ts
 * objectIs('foo', 'bar') // false
 * ```
 */
export function objectIs(value1: any, value2: any) {
	if (value1 === value2) {
		// Check if the values are strictly equal.
		if (value1 !== 0) {
			// If neither value is 0 or -0, the values are the same.
			return true;
		} else {
			// If either value is 0 or -0, check if 1 / x is the same for both.
			return 1 / value1 === 1 / value2;
		}
	} else {
		// If the values are not strictly equal, check if they are both NaN by
		// comparing them to themselves.
		return value1 !== value1 && value2 !== value2;
	}
}

/**
 * Polyfill for {@link Object.setPrototypeOf}, sets the prototype of an object.
 * @param object The object.
 * @param prototype The prototype.
 */
export function setPrototypeOf(object: object, prototype: object | null) {
	// Some environments only support Object.setPrototypeOf, while others only
	// support the non-standard __proto__ property.
	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(object, prototype);
	} else if ((object as any).__proto__) {
		(object as any).__proto__ = prototype;
	} else {
		throw new Error('Could not set prototype, not supported by environment');
	}
}
