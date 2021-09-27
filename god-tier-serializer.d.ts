/**
 * A god-tier-serializer configuration object.
 */
interface GTConfig {
    /**
     * Whether to force {@link serialize} to serialize values even if their
     * prototype is unregistered. If the serializer encounters a prototype that
     * it doesn't recognize, it will serialize it using Object.prototype as the
     * prototype.
     *
     * ***Do not enable this unless you know what you're doing!***
     */
    forceSerialization: boolean;
    /**
     * Whether to infer prototype names automatically.
     *
     * ***Do not enable this unless you know what you're doing!***
     */
    inferPrototypeNames: boolean;
}
/**
 * A definition for a prototype consisting of a prototype and a name.
 * @internal
 */
declare type PrototypeDefinition = [
    /**
     * The prototype.
     */
    prototype: object | null,
    /**
     * The name of the prototype.
     */
    name: string
];
/**
 * A value structured for serialization.
 */
declare type GTAny = GTUndefined | GTNull | GTBigInt | GTBoolean | GTNumber | GTString | GTObject;
/**
 * Undefined structured for serialization.
 */
declare type GTUndefined = [
    /**
     * The type of the value.
     */
    type: 'undefined'
];
/**
 * Null structured for serialization.
 */
declare type GTNull = [
    /**
     * The type of the value.
     */
    type: 'null'
];
/**
 * A BigInt structured for serialization.
 */
declare type GTBigInt = [
    /**
     * The type of the value.
     */
    type: 'bigint',
    /**
     * The value as a string.
     */
    asString: string
];
/**
 * A boolean structured for serialization.
 */
declare type GTBoolean = [
    /**
     * The type of the value.
     */
    type: 'boolean',
    /**
     * The value.
     */
    value: boolean
];
/**
 * A number structured for serialization.
 */
declare type GTNumber = [
    /**
     * The type of the value.
     */
    type: 'number',
    /**
     * The value as a string.
     */
    asString: string
];
/**
 * A string structured for serialization.
 */
declare type GTString = [
    /**
     * The type of the value.
     */
    type: 'string',
    /**
     * The value.
     */
    value: string
];
/**
 * An object structured for serialization.
 */
declare type GTObject = [
    /**
     * The type of the value.
     */
    type: 'object',
    /**
     * The name of the prototype.
     */
    prototypeName: string,
    /**
     * The properties of the object.
     */
    properties: GTProperty[]
];
/**
 * A property of a {@link GTObject}.
 */
declare type GTProperty = [
    /**
     * The index of the key.
     */
    keyIndex: number,
    /**
     * The index of the value.
     */
    valueIndex: number,
    /**
     * Whether the property can be configured.
     */
    configurable: boolean,
    /**
     * Whether the property can be enumerated.
     */
    enumerable: boolean,
    /**
     * Whether the property can be overwritten.
     */
    writable: boolean
];
declare var GodTierSerializer: {
    config: GTConfig;
    register: (prototype: object, name?: string | undefined) => void;
    serialize: (value: any) => string;
    deserialize: (string: string) => unknown;
};
