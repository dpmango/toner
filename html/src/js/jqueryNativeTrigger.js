const $ = require('jquery');

const createdEvents = {};

$.fn.nativeTrigger = function(eventName) {
	let customEvent = createdEvents[eventName];

	if (!customEvent) {
		createdEvents[eventName] = customEvent = document.createEvent('CustomEvent');
		customEvent.initEvent(eventName, true, true);
	}

	return this.each(function(i, el) {
		el.dispatchEvent(customEvent);
	});
};