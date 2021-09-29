/**
 * Polyfill for {@link Array.prototype.find}, gets the first element in an
 * array that satisfies a given condition.
 * @param array The array.
 * @param callback The function to call for each element.
 * @returns The element.
 * @internal
 */
export declare function arrayFind<T>(array: T[], callback: (element: T, index: number, array: T[]) => boolean): T | undefined;
/**
 * Polyfill for {@link Object.is}, checks whether two values are the same.
 * @param value1 The first value.
 * @param value2 The second value.
 * @returns Whether the values are the same.
 * @internal
 */
export declare function objectIs(value1: any, value2: any): boolean;
