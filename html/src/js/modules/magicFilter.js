'use strict';

const moduleName = 'magicFilter';

const MagicFilter = require('./magicFilter/magicFilter');

module.exports = function () {
	Array.from(document.querySelectorAll('[js-magic-filter]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper  = self;
		const elements = wrapper.querySelectorAll('[js-magic-filter-element]');



		const filter = new MagicFilter(wrapper, elements);



		filter.initFilter();



		wrapper.addEventListener('input', () => filter.filter());



	});
};