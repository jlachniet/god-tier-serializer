import { safeTypeOf } from './utils';

export const config = {
	get inferIdentifiers() {
		return _inferIdentifiers;
	},
	get serializePrototypes() {
		return _serializePrototypes;
	},
	set inferIdentifiers(state) {
		if (safeTypeOf(state) !== 'boolean') {
			throw new TypeError(
				'config.inferIdentifiers set to invalid value, expected (boolean) but got (' +
					safeTypeOf(state) +
					')'
			);
		}
		_inferIdentifiers = state;
	},
	set serializePrototypes(state) {
		if (safeTypeOf(state) !== 'boolean') {
			throw new TypeError(
				'config.serializePrototypes set to invalid value, expected (boolean) but got (' +
					safeTypeOf(state) +
					')'
			);
		}
		_serializePrototypes = state;
	},
};

let _inferIdentifiers = false;
let _serializePrototypes = false;
