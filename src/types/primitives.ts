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
