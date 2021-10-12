import { safeTypeOf } from './utils/utils';

export const config = {
	/**
	 * Whether to infer a prototype's identifier during registration when
	 * possible.
	 *
	 * Enabling this may cause compatibility issues, especially if your code
	 * will be minified, or if you need to support legacy browsers.
	 */
	get inferIdentifiers() {
		return _inferIdentifiers;
	},

	/**
	 * Whether to serialize unregistered prototypes.
	 *
	 * You can safely leave this disabled unless you are generating prototypes
	 * at runtime.
	 */
	get serializePrototypes() {
		return _serializePrototypes;
	},

	set inferIdentifiers(value) {
		// Validate that the value is the correct type.
		if (safeTypeOf(value) !== 'boolean') {
			throw new TypeError(
				`config.inferIdentifiers set to invalid value, expected (boolean) but got (${safeTypeOf(
					value
				)})`
			);
		}
		_inferIdentifiers = value;
	},

	set serializePrototypes(value) {
		// Validate that the value is the correct type.
		if (safeTypeOf(value) !== 'boolean') {
			throw new TypeError(
				`config.serializePrototypes set to invalid value, expected (boolean) but got (${safeTypeOf(
					value
				)})`
			);
		}
		_serializePrototypes = value;
	},
};

let _inferIdentifiers = false;
let _serializePrototypes = false;
