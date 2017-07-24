'use strict';

const moduleName = 'fancybox';

require('fancybox/dist/jquery.fancybox.css');
require('fancybox/dist/jquery.fancybox.js');

module.exports = function () {
	Array.from(document.querySelectorAll('[js-fancybox]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper   = self;
		const $elements = $(wrapper).find('[data-fancybox]');



		$elements.fancybox();



	});
};