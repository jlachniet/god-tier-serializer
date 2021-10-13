const {serialize, deserialize} = require('../dist/god-tier-serializer');

test('roundtrip Undefined', () => {
    expect(deserialize(serialize(undefined))).toBe(undefined);
});

test('roundtrip Null', () => {
    expect(deserialize(serialize(null))).toBe(null);
});

test('roundtrip BigInt', () => {
    expect(deserialize(serialize(-4n))).toBe(-4n);
    expect(deserialize(serialize(0n))).toBe(0n);
    expect(deserialize(serialize(4n))).toBe(4n);
});

test('roundtrip Number', () => {
    expect(deserialize(serialize(-4))).toBe(-4);
    expect(deserialize(serialize(4))).toBe(4);

    expect(deserialize(serialize(0))).toBe(0);
    expect(deserialize(serialize(-0))).toBe(-0);

    expect(deserialize(serialize(0))).not.toBe(-0);
    expect(deserialize(serialize(-0))).not.toBe(0);

    expect(deserialize(serialize(NaN))).toBe(NaN);

    expect(deserialize(serialize(Infinity))).toBe(Infinity);
    expect(deserialize(serialize(-Infinity))).toBe(-Infinity);

    expect(deserialize(serialize(2 * 10 ** 50))).toBe(2 * 10 ** 50);
    expect(deserialize(serialize(2 * 10 ** 50))).not.toBe(Infinity);

    expect(deserialize(serialize(-2 * 10 ** 50))).toBe(-2 * 10 ** 50);
    expect(deserialize(serialize(-2 * 10 ** 50))).not.toBe(-Infinity);
});

test('roundtrip String', () => {
    expect(deserialize(serialize(''))).toBe('');
    expect(deserialize(serialize('god-tier-serializer'))).toBe(
        'god-tier-serializer'
    );
    expect(deserialize(serialize('𝓰𝓸𝓭-𝓽𝓲𝓮𝓻-𝓼𝓮𝓻𝓲𝓪𝓵𝓲𝔃𝓮𝓻'))).toBe(
        '𝓰𝓸𝓭-𝓽𝓲𝓮𝓻-𝓼𝓮𝓻𝓲𝓪𝓵𝓲𝔃𝓮𝓻'
    );
    expect(deserialize(serialize('✨✨ gts ✨✨'))).toBe('✨✨ gts ✨✨');
});

test('roundtrip Boolean', () => {
    expect(deserialize(serialize(true))).toBe(true);
    expect(deserialize(serialize(false))).toBe(false);
});

test('roundtrip Symbol', () => {
    expect(deserialize(serialize(Symbol.for('gts')))).toBe(Symbol.for('gts'));
    expect(deserialize(serialize(Symbol.for('')))).toBe(Symbol.for(''));
    expect(deserialize(serialize(Symbol.for('')))).not.toBe(Symbol.for('gts'));
    expect(deserialize(serialize(Symbol('')))).not.toBe(Symbol(''));
});

test('roundtrip Object', () => {
    // noinspection JSPrimitiveTypeWrapperUsage
    let course = {
        'name': 'Intro to Database Systems',
        'id': Symbol.for('CS 3425'),
        'enrolled_count': 123,
        'taught_online': false,
        'instructor': undefined,
        'location': null,
        'student': [
            {name: 'Jacob', id: 123},
            {name: 'Julian', id: 987}
        ],
        'start_date': new Date(2021, 8, 30),
        'end_date': new Date(2021, 10, 10),
        'days_of_week': ['T', 'R'],
        'has_started': new Boolean(true),
        'credit_hours': new Number(3.0),
        'description': new String('Learn how to create databases and use SQL.'),
        'microsecond_length': new Object(100800000000n)
    };
    const deserialized = deserialize(serialize(course));
    for (let key in deserialized) {
        if (typeof course[key] !== "object" || course[key] === null) {
            expect(deserialized[key]).toBe(course[key])
        } else {
            if (course[key].constructor.name === 'String') {
                expect(deserialized[key].valueOf()).toBe(course[key].valueOf())
            }
        }
    }
});
