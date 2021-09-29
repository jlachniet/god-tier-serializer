/**
 * Registers a prototype for serialization.
 * @param prototype The prototype.
 * @param name The name of the prototype.
 */
export declare function register(prototype: object, name?: string): void;
/**
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized string.
 */
export declare function serialize(value: any): string;
/**
 * Deserializes a string to a value.
 * @param value The serialized string.
 * @returns The value.
 */
export declare function deserialize(string: string): unknown;
