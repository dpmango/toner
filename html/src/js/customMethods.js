'use strict';

const moduleName = 'customMethods';

module.exports = function () {
	Array.from(document.querySelectorAll('body')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		NodeList.prototype.addEventListener = function (type, listener, useCapture) {
			Array.from(this).forEach((value) => {
				value.addEventListener(type, listener, !!useCapture ? useCapture : false);
			});
		};






		Element.prototype.getElementIndex = function (tag) {
			const children 		 = this.parentNode.children;
			let filteredElements = [];

			if (tag) {
				Array.from(children).forEach((self, index) => {
					if (children[index].tagName.toLocaleLowerCase() === tag.toLocaleLowerCase()) {
						filteredElements.push(self);
					}
				});
			} else {
				filteredElements = Array.from(children);
			}

			return filteredElements.indexOf(this);
		};






		Element.prototype.getChildren = function (tag) {
			const children 		  = this.children;
			let filteredElements  = [];

			if (tag) {
				Array.from(children).forEach((self, index) => {
					if (children[index].tagName.toLocaleLowerCase() === tag.toLocaleLowerCase()) {
						filteredElements.push(self);
					}
				});
			} else {
				filteredElements = Array.from(children);
			}

			return Array.from(filteredElements);
		};



	});
};