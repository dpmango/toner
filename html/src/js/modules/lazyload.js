'use strict';

const moduleName = 'lazyload';

require('jquery_lazyload/jquery.lazyload.js');

module.exports = function () {
	Array.from(document.querySelectorAll('img[data-src]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper = self;



		$(wrapper).lazyload({
			'threshold': 200,
			'skip_invisible': true,
			'data_attribute': 'src',
			'effect': 'fadeIn',
			'placeholder': '',
			'event': 'scroll runLazyLoad'
		});



	});
};