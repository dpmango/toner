'use strict';

module.exports = class CallbackBuffer {
	constructor (items) {
		items.forEach((item) => this.push(item));
	}

	//noinspection JSMethodCanBeStatic
	push (...items) {
		items.forEach((item) => item.call());
	}
};