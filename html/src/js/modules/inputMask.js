'use strict';

const moduleName = 'inputMask';

require('jquery.inputmask/dist/jquery.inputmask.bundle.js');

module.exports = function () {
	Array.from(document.querySelectorAll('[type="tel"]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper = self;



		$(wrapper).inputmask('+7 (999) 999-99-99', {
			'clearIncomplete': true
		});



		wrapper.addEventListener('input', () => {
			const status = $(wrapper).inputmask('isComplete');

			if (status) {
				wrapper.classList.add('complete-inputmask');
			} else {
				wrapper.classList.remove('complete-inputmask');
			}
		});



	});
};