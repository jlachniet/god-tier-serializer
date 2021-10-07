/**
 * A value structured for serialization.
 */
export type GTAny = GTPrimitive | GTObject | GTReference;

/**
 * A structured primitive.
 */
export type GTPrimitive =
	| GTUndefined
	| GTNull
	| GTBoolean
	| GTNumber
	| GTString
	| GTBigInt;

/**
 * A structured undefined value.
 */
export type GTUndefined = [
	/**
	 * The type of the value.
	 */
	type: 'undefined'
];

/**
 * A structured null value.
 */
export type GTNull = [
	/**
	 * The type of the value.
	 */
	type: 'null'
];

/**
 * A structured boolean.
 */
export type GTBoolean = [
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
 * A structured number.
 */
export type GTNumber = [
	/**
	 * The type of the value.
	 */
	type: 'number',
	/**
	 * The value as a string.
	 */
	valueAsString: string
];

/**
 * A structured string.
 */
export type GTString = [
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
 * A structured BigInt.
 */
export type GTBigInt = [
	/**
	 * The type of the value.
	 */
	type: 'bigint',
	/**
	 * The value as a string.
	 */
	valueAsString: string
];

/**
 * A structured object.
 */
export type GTObject =
	| GTStandardObject
	| GTArray
	| GTBigIntObject
	| GTBooleanObject
	| GTDate
	| GTNumberObject
	| GTRegExp
	| GTStringObject;

/**
 * A {@link GTObject} with no special properties.
 */
export type GTStandardObject = [
	/**
	 * The type of the value.
	 */
	type: 'Object',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the object.
	 */
	descriptors: GTDescriptor[]
];

/**
 * A structured array.
 */
export type GTArray = [
	/**
	 * The type of the value.
	 */
	type: 'Array',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the array.
	 */
	descriptors: GTDescriptor[]
];

/**
 * A structured BigInt object.
 */
export type GTBigIntObject = [
	/**
	 * The type of the value.
	 */
	type: 'BigInt',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the BigInt object.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the BigInt object as a string.
	 */
	internalValueAsString: string
];

/**
 * A structured boolean object.
 */
export type GTBooleanObject = [
	/**
	 * The type of the value.
	 */
	type: 'Boolean',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the boolean object.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the boolean object.
	 */
	internalValue: boolean
];

/**
 * A structured date.
 */
export type GTDate = [
	/**
	 * The type of the value.
	 */
	type: 'Date',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the date.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the date.
	 */
	internalValue: number
];

/**
 * A structured number object.
 */
export type GTNumberObject = [
	/**
	 * The type of the value.
	 */
	type: 'Number',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the number object.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the number object as a string.
	 */
	internalValueAsString: string
];

/**
 * A structured RegExp.
 */
export type GTRegExp = [
	/**
	 * The type of the value.
	 */
	type: 'RegExp',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the RegExp.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the RegExp.
	 */
	internalValue: string
];

/**
 * A structured string object.
 */
export type GTStringObject = [
	/**
	 * The type of the value.
	 */
	type: 'String',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the string object.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The internal value of the string object.
	 */
	internalValue: string
];

/**
 * A descriptor for a property of a {@link GTObject}.
 */
export type GTDescriptor = [
	/**
	 * The index of the key.
	 */
	keyIndex: number,
	/**
	 * The index of the value.
	 */
	valueIndex: number,
	/**
	 * Whether the property is configurable.
	 */
	configurable: boolean,
	/**
	 * Whether the property is enumerable.
	 */
	enumerable: boolean,
	/**
	 * Whether the property is writable.
	 */
	writable: boolean
];

/**
 * A reference to an external object.
 */
export type GTReference = [
	/**
	 * The type of the value.
	 */
	type: 'reference',
	/**
	 * The identifier of the object.
	 */
	identifier: string
];
