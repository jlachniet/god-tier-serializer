/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
export function register(value: any, identifier?: string): void;

/**
 * Serializes a value to a string.
 * @param value The value.
 * @returns The serialized value.
 */
export function serialize(value: any): string;

/**
 * Deserializes a value from a string.
 * @param string The serialized value.
 * @returns The value.
 */
export function deserialize(string: string): unknown;
