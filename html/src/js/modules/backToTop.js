'use strict';

const moduleName = 'backToTop';

module.exports = function () {
	Array.from(document.querySelectorAll('[js-back-to-top]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper  = self;



		wrapper.addEventListener('click', (event) => {
			event.preventDefault();

			$('html, body').animate({scrollTop: 0}, 300);
		});



		window.addEventListener('scroll', () => {
			showOrHideBtn();
		});



		function showOrHideBtn() {
			if ((document.documentElement.scrollTop || document.body.scrollTop) > 440) {
				wrapper.classList.add('active');
			} else {
				wrapper.classList.remove('active');
			}
		}

		showOrHideBtn();



	});
};