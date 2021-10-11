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
	 * The description.
	 */
	description: string,
	/**
	 * The key.
	 */
	key?: string
];

/**
 * A structured object.
 */
export type GTObject =
	| GTStandardObject
	| GTArray
	| GTTypedArray
	| GTMap
	| GTSet
	| GTDate
	| GTRegExp
	| GTBooleanObject
	| GTNumberObject
	| GTStringObject
	| GTBigIntObject
	| GTSymbolObject;

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
	properties: GTProperty[]
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
	properties: GTProperty[]
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
	properties: GTProperty[],
	/**
	 * The length of the TypedArray.
	 */
	length: number
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
	properties: GTProperty[],
	/**
	 * The indices of the key-value pairs of the map.
	 */
	valueIndices: [number, number][]
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
	properties: GTProperty[],
	/**
	 * The indices of the values of the set.
	 */
	valueIndices: number[]
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
	properties: GTProperty[],
	/**
	 * The value of the date.
	 */
	internalValue: number
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
	properties: GTProperty[],
	/**
	 * The value of the RegExp.
	 */
	value: string
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
	properties: GTProperty[],
	/**
	 * The value of the boolean object.
	 */
	value: boolean
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
	properties: GTProperty[],
	/**
	 * The value of the number object as a string.
	 */
	valueAsString: string
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
	properties: GTProperty[],
	/**
	 * The value of the string object.
	 */
	value: string
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
	properties: GTProperty[],
	/**
	 * The value of the BigInt object as a string.
	 */
	valueAsString: string
];

/**
 * A structured symbol object.
 */
export type GTSymbolObject = [
	/**
	 * The type of the value.
	 */
	type: 'Symbol',
	/**
	 * The index of the prototype.
	 */
	prototypeIndex: number,
	/**
	 * The properties of the symbol object.
	 */
	properties: GTProperty[],
	/**
	 * The description of the symbol object.
	 */
	description: string,
	/**
	 * The key of the symbol object.
	 */
	key?: string
];

/**
 * A property of a {@link GTObject}.
 */
export type GTProperty = GTDataProperty | GTAccessorProperty;

/**
 * A data property of a {@link GTObject}.
 */
export type GTDataProperty = [
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
 * An accessor property of a {@link GTObject}.
 */
export type GTAccessorProperty = [
	/**
	 * The index of the key.
	 */
	keyIndex: number,
	/**
	 * The index of the getter.
	 */
	getIndex: number,
	/**
	 * The index of the setter.
	 */
	setIndex: number,
	/**
	 * Whether the property is configurable.
	 */
	configurable: boolean,
	/**
	 * Whether the property is enumerable.
	 */
	enumerable: boolean
];

/**
 * A reference to an external value.
 */
export type GTReference = [
	/**
	 * The type of the value.
	 */
	type: 'reference',
	/**
	 * The identifier of the value.
	 */
	identifier: string
];
