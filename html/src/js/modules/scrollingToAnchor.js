'use strict';

const moduleName = 'scrollingToAnchor';

module.exports = function () {
	Array.from(document.querySelectorAll('a[href^="#anchor-"]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper = self;



		wrapper.addEventListener('click', (event) => {
			event.preventDefault();

			const id  = wrapper.getAttribute('href');
			const top = $(id).offset().top;

			$('html, body').animate({scrollTop : top}, 800);
		});



	});
};