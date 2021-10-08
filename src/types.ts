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
	| GTBigInt
	| GTSymbol;

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
 * A structured symbol.
 */
export type GTSymbol = [
	/**
	 * The type of the value.
	 */
	type: 'symbol',
	/**
	 * The description of the symbol.
	 */
	description: string,
	/**
	 * The symbol's key, if it has one.
	 */
	key?: string
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
	| GTMap
	| GTNumberObject
	| GTRegExp
	| GTStringObject
	| GTTypedArray
	| GTSet;

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
 * A structured TypedArray.
 */
export type GTTypedArray = [
	/**
	 * The type of the value.
	 */
	type:
		| 'Int8Array'
		| 'Uint8Array'
		| 'Uint8ClampedArray'
		| 'Int16Array'
		| 'Uint16Array'
		| 'Int32Array'
		| 'Uint32Array'
		| 'Float32Array'
		| 'Float64Array'
		| 'BigInt64Array'
		| 'BigUint64Array',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the TypedArray.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The length of the TypedArray.
	 */
	length: number
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
 * A structured map.
 */
export type GTMap = [
	/**
	 * The type of the value.
	 */
	type: 'Map',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the map.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The indexes of the internal key-value pairs of the map.
	 */
	internalValueIndexes: [number, number][]
];

/**
 * A structured set.
 */
export type GTSet = [
	/**
	 * The type of the value.
	 */
	type: 'Set',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the set.
	 */
	descriptors: GTDescriptor[],
	/**
	 * The indexes of the internal values of the set.
	 */
	internalValueIndexes: number[]
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
