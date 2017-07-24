'use strict';

const moduleName = 'formError';

module.exports = function () {
	Array.from(document.querySelectorAll('input')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper	 = self;
		const errorClass = wrapper.closest('.form-error');



		wrapper.addEventListener('input', () => {
			if (errorClass) {
				errorClass.classList.remove('form-error');
			}
		});



	});



	Array.from(document.querySelectorAll('textarea')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper 	 = self;
		const errorClass = wrapper.closest('.form-error');



		wrapper.addEventListener('input', () => {
			if (errorClass) {
				errorClass.classList.remove('form-error');
			}
		});



	});



	Array.from(document.querySelectorAll('select')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper 	 = self;
		const errorClass = wrapper.closest('.form-error');



		wrapper.addEventListener('input', () => {
			if (errorClass) {
				errorClass.classList.remove('form-error');
			}
		});



	});
};