import { setPrototypeOf } from './polyfills';
import { GTAny } from './types';
import {
	getDefinitionByIdentifier,
	isGTDataDescriptor,
	isGTObject,
	safeTypeOf,
} from './utils';

/**
 * Deserializes a value from a string.
 * @param string The serialized value.
 * @returns The value.
 */
export function deserialize(string: string): unknown {
	if (safeTypeOf(string) !== 'string') {
		throw new TypeError(
			'deserialize called with invalid arguments, expected (string) but got (' +
				safeTypeOf(string) +
				')'
		);
	}

	// Create arrays of mapped values (as parsed from the provided JSON) and
	// original values (regular JS values).
	const mappedValues = JSON.parse(string) as GTAny[];
	const originalValues: any[] = [];

	for (let i = 0; i < mappedValues.length; i++) {
		// For each GTAny, pass the index to the unmap function.
		unmapValue(i);
	}

	/**
	 * Converts a {@link GTAny} at a given index to a native value.
	 * @param index The index.
	 * @internal
	 */
	function unmapValue(index: number) {
		// If the value is already mapped, return immediately.
		if (
			Object.getOwnPropertyNames(originalValues).indexOf(String(index)) > -1
		) {
			return;
		}

		// Get the mapped value.
		const mappedValue = mappedValues[index];

		switch (mappedValue[0]) {
			// If the mapped value is a GTPrimitive, convert to a native
			// primitive.
			case 'undefined':
				originalValues[index] === undefined;
				break;
			case 'null':
				originalValues[index] = null;
				break;
			case 'boolean':
				originalValues[index] = mappedValue[1];
				break;
			case 'number':
				originalValues[index] = Number(mappedValue[1]);
				break;
			case 'string':
				originalValues[index] = mappedValue[1];
				break;
			case 'bigint':
				originalValues[index] = BigInt(mappedValue[1]);
				break;
			case 'symbol':
				if (mappedValue[2] === undefined) {
					originalValues[index] = Symbol(mappedValue[1]);
				} else {
					originalValues[index] = Symbol.for(mappedValue[1]);
				}
				break;
			case 'reference':
				// If the mapped value is a reference, get the definition and
				// add the corresponding object.
				originalValues[index] = getDefinitionByIdentifier(mappedValue[1])![0];
				break;
			default:
				unmapValue(mappedValue[1]);
				let isStandardObject = false;

				// If none of the above apply, then the value is a GTObject.
				// Unmap the prototype and then create a native object from the
				// prototype.
				switch (mappedValue[0]) {
					case 'Array':
						originalValues[index] = new Array();
						break;
					case 'Int8Array':
						originalValues[index] = new Int8Array(mappedValue[3]);
						break;
					case 'Uint8Array':
						originalValues[index] = new Uint8Array(mappedValue[3]);
						break;
					case 'Uint8ClampedArray':
						originalValues[index] = new Uint8ClampedArray(mappedValue[3]);
						break;
					case 'Int16Array':
						originalValues[index] = new Int16Array(mappedValue[3]);
						break;
					case 'Uint16Array':
						originalValues[index] = new Uint16Array(mappedValue[3]);
						break;
					case 'Int32Array':
						originalValues[index] = new Int32Array(mappedValue[3]);
						break;
					case 'Uint32Array':
						originalValues[index] = new Uint32Array(mappedValue[3]);
						break;
					case 'Float32Array':
						originalValues[index] = new Float32Array(mappedValue[3]);
						break;
					case 'Float64Array':
						originalValues[index] = new Float64Array(mappedValue[3]);
						break;
					case 'BigInt64Array':
						originalValues[index] = new BigInt64Array(mappedValue[3]);
						break;
					case 'BigUint64Array':
						originalValues[index] = new BigUint64Array(mappedValue[3]);
						break;
					case 'BigInt':
						originalValues[index] = new Object(BigInt(mappedValue[3]));
						break;
					case 'Boolean':
						originalValues[index] = new Boolean(mappedValue[3]);
						break;
					case 'Date':
						originalValues[index] = new Date(mappedValue[3]);
						break;
					case 'RegExp':
						const lastSlashPosition = mappedValue[3].lastIndexOf('/');
						const pattern = mappedValue[3].substring(1, lastSlashPosition);
						const flags = mappedValue[3].substring(lastSlashPosition + 1);

						originalValues[index] = new RegExp(pattern, flags);
						break;
					case 'String':
						originalValues[index] = new String(mappedValue[3]);
						break;
					case 'Map':
						originalValues[index] = new Map();
						break;
					case 'Set':
						originalValues[index] = new Set();
						break;
					case 'Symbol':
						if (mappedValue[4] === undefined) {
							originalValues[index] = new Object(Symbol(mappedValue[3]));
						} else {
							originalValues[index] = new Object(Symbol.for(mappedValue[3]));
						}
						break;
					default:
						originalValues[index] = Object.create(
							originalValues[mappedValue[1]]
						);
						isStandardObject = true;
				}

				const proto = mappedValues[mappedValue[1]];
				if (proto[0] !== 'reference' || proto[1] !== mappedValue[0]) {
					setPrototypeOf(originalValues[index], originalValues[mappedValue[1]]);
				}
		}
	}

	mappedValues.forEach((value, index) => {
		if (isGTObject(value)) {
			// For each GTObject, convert the GTDescriptors into native descriptors.
			value[2].forEach((descriptor) => {
				if (isGTDataDescriptor(descriptor)) {
					Object.defineProperty(
						originalValues[index],
						originalValues[descriptor[0]],
						{
							value: originalValues[descriptor[1]],
							configurable: descriptor[2],
							enumerable: descriptor[3],
							writable: descriptor[4],
						}
					);
				} else {
					Object.defineProperty(
						originalValues[index],
						originalValues[descriptor[0]],
						{
							get: originalValues[descriptor[1]],
							set: originalValues[descriptor[2]],
							configurable: descriptor[3],
							enumerable: descriptor[4],
						}
					);
				}
			});

			if (value[0] === 'Map') {
				value[3].forEach((keyValueIndex) => {
					originalValues[index].set(
						originalValues[keyValueIndex[0]],
						originalValues[keyValueIndex[1]]
					);
				});
			}

			if (value[0] === 'Set') {
				value[3].forEach((valueIndex) => {
					originalValues[index].add(originalValues[valueIndex]);
				});
			}
		}
	});

	return originalValues[0];
}
