/**
 * Gets the index of an element in an array and compares elements using
 * {@link objectIs} to support -0 and NaN correctly.
 * @param array The array.
 * @param value The value.
 * @returns
 * @internal
 */
export declare function safeIndexOf(array: any[], value: any): number;
/**
 * Gets the type of a value as a string and handles null correctly.
 * @param value The value.
 * @returns The type.
 * @internal
 */
export declare function safeTypeOf(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null";
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
export declare function validateTypes(args: any, types: (string | string[])[]): boolean;
