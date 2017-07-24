'use strict';

const moduleName = 'polyfills';

module.exports = function () {
	Array.from(document.querySelectorAll('body')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		(() => {
			if (!Element.prototype.closest) {
				Element.prototype.closest = function (css) {
					let node = this;

					while (node) {
						if (node.matches(css)) {
							return node;
						} else {
							node = node.parentElement;
						}
					}

					return null;
				};
			}
		})();






		(() => {
			if (Element && !Element.prototype.matches) {
				const proto = Element.prototype;

				proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
			}
		})();






		(() => {
			[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach((self) => {
				if (self.hasOwnProperty('remove')) {
					return;
				}

				Object.defineProperty(self, 'remove', {
					configurable: true,
					enumerable: true,
					writable: true,
					value: function remove() {
						this.parentNode.removeChild(this);
					}
				});
			});
		})();






		(() => {
			if (typeof window.CustomEvent === 'function') return false;

			function CustomEvent(event, params) {
				params = params || { bubbles: false, cancelable: false, detail: undefined };
				var evt = document.createEvent('CustomEvent');
				evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
				return evt;
			}

			CustomEvent.prototype = window.Event.prototype;

			window.CustomEvent = CustomEvent;
		})();



	});
};  