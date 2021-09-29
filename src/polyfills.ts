/**
 * Polyfill for {@link Array.prototype.find}, gets the first element in an
 * array that satisfies a given condition.
 * @param array The array.
 * @param callback The function to call for each element.
 * @returns The element.
 * @internal
 */
export function arrayFind<T>(
	array: T[],
	callback: (element: T, index: number, array: T[]) => boolean
): T | undefined {
	for (var i = 0; i < array.length; i++) {
		if (callback(array[i], i, array)) {
			return array[i];
		}
	}
}

/**
 * Polyfill for {@link Object.is}, checks whether two values are the same.
 * @param value1 The first value.
 * @param value2 The second value.
 * @returns Whether the values are the same.
 * @internal
 */
export function objectIs(value1: any, value2: any): boolean {
	if (value1 === value2) {
		if (value1 !== 0) {
			return true;
		} else {
			return 1 / value1 === 1 / value2;
		}
	}
	return value1 !== value1 && value2 !== value2;
}
