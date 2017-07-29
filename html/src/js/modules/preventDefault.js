'use strict';

// what it's for
// prevent page jumps on blank links
// usefull for development

const moduleName = 'preventDefault';

module.exports = function () {
	Array.from(document.querySelectorAll('a[href="#"]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;

		const wrapper = self;

		wrapper.addEventListener('click', (event) => {
			event.preventDefault();
		});

	});
};
