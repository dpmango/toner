'use strict';

const moduleName = 'datepicker';

require('air-datepicker/dist/js/datepicker.min.js');
require('air-datepicker/dist/css/datepicker.min.css');

module.exports = function () {
	Array.from(document.querySelectorAll('[js-datepicker]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;

		const wrapper = self;
    const datepickerOptions = {
      minDate: new Date()
    }

		$(self).datepicker([datepickerOptions])

	});
};
