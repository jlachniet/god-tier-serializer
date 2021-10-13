const exp = require('constants');
const {
	serialize,
	deserialize,
	register,
} = require('../dist/god-tier-serializer');

function roundtrip(value) {
	return deserialize(serialize(value));
}

test('Roundtrip undefined', () => {
	expect(roundtrip(undefined)).toBe(undefined);
});

test('Roundtrip null', () => {
	expect(roundtrip(null)).toBe(null);
});

test('Roundtrip BigInt', () => {
	expect(roundtrip(-4n)).toBe(-4n);
	expect(roundtrip(0n)).toBe(0n);
	expect(roundtrip(4n)).toBe(4n);
});

test('Roundtrip number', () => {
	expect(roundtrip(-4)).toBe(-4);
	expect(roundtrip(4)).toBe(4);

	expect(roundtrip(0)).toBe(0);
	expect(roundtrip(-0)).toBe(-0);

	expect(roundtrip(0)).not.toBe(-0);
	expect(roundtrip(-0)).not.toBe(0);

	expect(roundtrip(NaN)).toBe(NaN);

	expect(roundtrip(Infinity)).toBe(Infinity);
	expect(roundtrip(-Infinity)).toBe(-Infinity);

	expect(roundtrip(2 * 10 ** 50)).toBe(2 * 10 ** 50);
	expect(roundtrip(2 * 10 ** 50)).not.toBe(Infinity);

	expect(roundtrip(-2 * 10 ** 50)).toBe(-2 * 10 ** 50);
	expect(roundtrip(-2 * 10 ** 50)).not.toBe(-Infinity);
});

test('Roundtrip string', () => {
	expect(roundtrip('')).toBe('');
	expect(roundtrip('god-tier-serializer')).toBe('god-tier-serializer');
	expect(roundtrip('𝓰𝓸𝓭-𝓽𝓲𝓮𝓻-𝓼𝓮𝓻𝓲𝓪𝓵𝓲𝔃𝓮𝓻')).toBe('𝓰𝓸𝓭-𝓽𝓲𝓮𝓻-𝓼𝓮𝓻𝓲𝓪𝓵𝓲𝔃𝓮𝓻');
	expect(roundtrip('✨✨ gts ✨✨')).toBe('✨✨ gts ✨✨');
});

test('Roundtrip boolean', () => {
	expect(roundtrip(true)).toBe(true);
	expect(roundtrip(false)).toBe(false);
});

test('Roundtrip symbol', () => {
	expect(roundtrip(Symbol.for(''))).toBe(Symbol.for(''));
	expect(roundtrip(Symbol.for('gts'))).toBe(Symbol.for('gts'));
	expect(roundtrip(Symbol.for('gts'))).not.toBe(Symbol.for('not gts'));
	expect(roundtrip(Symbol.for())).not.toBe(Symbol.for(''));

	const mySymbol = Symbol();
	const mySymbols = roundtrip([mySymbol, mySymbol, Symbol()]);

	expect(mySymbols[0]).toBe(mySymbols[1]);
	expect(mySymbols[0]).not.toBe(mySymbols[2]);
});

test('Roundtrip object', () => {
	const course = {
		name: 'Intro to Database Systems',
		description: new String('Learn how to create databases and use SQL.'),
		id: Symbol.for('CS 3425'),
		taught_online: false,
		credit_hours: new Number(3.0),
		enrolled_count: 123,
		instructor: undefined,
		location: null,
		students: [
			{ name: 'Jacob', id: 471 },
			{ name: 'Julian', id: 238 },
		],
		start_date: new Date(2021, 7, 30),
		end_date: new Date(2021, 9, 10),
		days_of_week: ['T', 'R'],
		has_started: new Boolean(true),
		microsecond_length: new Object(100800000000n),
	};
	expect(roundtrip(course)).toEqual(course);
});

test('Roundtrip null object', () => {
	expect(Object.create(null)).toEqual(roundtrip(Object.create(null)));
	expect(Object.getPrototypeOf(roundtrip(Object.create(null)))).toBe(null);
	expect(Object.getOwnPropertyNames(roundtrip(Object.create(null)))).toEqual(
		[]
	);
});

test('Roundtrip array', () => {
	const myArray = [0, -0, [0, -0]];
	expect(myArray).toEqual(roundtrip(myArray));
});

test('Roundtrip typed array', () => {
	expect(new Int8Array([4])).toEqual(roundtrip(new Int8Array([4])));
	expect(new Uint8Array([4])).toEqual(roundtrip(new Uint8Array([4])));
	expect(new Uint8ClampedArray([4])).toEqual(
		roundtrip(new Uint8ClampedArray([4]))
	);
	expect(new Int16Array([4])).toEqual(roundtrip(new Int16Array([4])));
	expect(new Uint16Array([4])).toEqual(roundtrip(new Uint16Array([4])));
	expect(new Int32Array([4])).toEqual(roundtrip(new Int32Array([4])));
	expect(new Uint32Array([4])).toEqual(roundtrip(new Uint32Array([4])));
	expect(new Float32Array([4])).toEqual(roundtrip(new Float32Array([4])));
	expect(new Float64Array([4])).toEqual(roundtrip(new Float64Array([4])));
	expect(new BigInt64Array([4n])).toEqual(roundtrip(new BigInt64Array([4n])));
	expect(new BigUint64Array([4n])).toEqual(roundtrip(new BigUint64Array([4n])));
});

test('Roundtrip set', () => {
	const mySet = new Set([1, 2, 3]);
	expect(mySet).toEqual(roundtrip(mySet));
});

test('Roundtrip map', () => {
	const myMap = new Map([
		['a', 1],
		['b', 2],
		['c', 3],
	]);
	expect(myMap).toEqual(roundtrip(myMap));
});

test('Roundtrip date', () => {
	expect(new Date(2020, 2, 13)).toEqual(roundtrip(new Date(2020, 2, 13)));
});

test('Roundtrip RegExp', () => {
	expect(/[a-z]/).toEqual(roundtrip(/[a-z]/));
	expect(/[a-z]/g).toEqual(roundtrip(/[a-z]/g));
});

test('Roundtrip primitive wrapper', () => {
	expect(new Boolean(true)).toEqual(roundtrip(new Boolean(true)));
	expect(new Number(3.0)).toEqual(roundtrip(new Number(3.0)));
	expect(new String('gts')).toEqual(roundtrip(new String('gts')));
	expect(new Object(3n)).toEqual(roundtrip(new Object(3n)));
});

test('Roundtrip function', () => {
	let fn = function () {};
	let aFn = async function () {};
	let gFn = function* () {};
	let gaFn = async function* () {};

	expect(() => {
		roundtrip(fn);
	}).toThrow();
	expect(() => {
		roundtrip(aFn);
	}).toThrow();
	expect(() => {
		roundtrip(gFn);
	}).toThrow();
	expect(() => {
		roundtrip(gaFn);
	}).toThrow();

	register(fn, 'fn');
	register(aFn, 'aFn');
	register(gFn, 'gFn');
	register(gaFn, 'gaFn');

	expect(fn).toBe(roundtrip(fn));
	expect(aFn).toBe(roundtrip(aFn));
	expect(gFn).toBe(roundtrip(gFn));
	expect(gaFn).toBe(roundtrip(gaFn));
});
