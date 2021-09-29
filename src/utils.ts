import { objectIs } from './polyfills';

/**
 * Gets the index of an element in an array and compares elements using
 * {@link objectIs} to support -0 and NaN correctly.
 * @param array The array.
 * @param value The value.
 * @returns
 * @internal
 */
export function safeIndexOf(array: any[], value: any): number {
	for (var i = 0; i < array.length; i++) {
		if (objectIs(array[i], value)) {
			return i;
		}
	}
	return -1;
}

/**
 * Gets the type of a value as a string and handles null correctly.
 * @param value The value.
 * @returns The type.
 * @internal
 */
export function safeTypeOf(value: any) {
	return value === null ? 'null' : typeof value;
}

/**
 * Checks whether a set of arguments are the correct types.
 * @param args The arguments.
 * @param types The types.
 * @returns Whether the arguments are the correct types.
 * @internal
 * ```ts
 * validateTypes(['a', 3], ['string', 'boolean']); // false
 * validateTypes(['a', 3], ['string', ['boolean', 'number']]); //true
 * ```
 */
export function validateTypes(args: any, types: (string | string[])[]) {
	// For each argument, validate it against the type or types.
	for (var i = 0; i < args.length; i++) {
		if (Array.isArray(types[i])) {
			// If multiple types are provided, check if the argument matches
			// any of them.
			var matched = false;
			for (var j = 0; j < types[i].length; j++) {
				if (safeTypeOf(args[i]) === types[i][j]) {
					matched = true;
				}
			}
			if (!matched) {
				// If none of the types provided match, fail the validation.
				return false;
			}
		} else {
			if (safeTypeOf(args[i]) !== types[i]) {
				// If the type doesn't match, fail the validation.
				return false;
			}
		}
	}
	// If all arguments are of the correct type, pass validation.
	return true;
}
