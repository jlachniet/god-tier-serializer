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

/**
 * Registers a value with an identifier so that it can be referenced during
 * serialization and retrieved during deserialization.
 * @param value The value.
 * @param identifier The identifier.
 */
export function register(value: any, identifier?: string): void;

/**
 * A configuration object.
 */
export var config: {
	/**
	 * Whether to infer a prototype's identifier during registration when
	 * possible.
	 *
	 * Enabling this may cause compatibility issues, especially if your code
	 * will be minified, or if you need to support legacy browsers.
	 *
	 * **Default:** `false`
	 */
	inferIdentifiers: boolean;
	/**
	 * Whether to serialize unregistered prototypes.
	 *
	 * You can safely leave this disabled unless you are generating prototypes
	 * at runtime.
	 *
	 * **Default:** `false`
	 */
	serializePrototypes: boolean;
};
