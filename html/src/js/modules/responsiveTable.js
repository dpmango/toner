'use strict';

const moduleName = 'responsiveTable';

module.exports = function () {
	Array.from(document.querySelectorAll('[js-responsive-table]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const $table = $(self);
		const titles = $table.find('thead td').get().map(item => $(item).text());



		$table.find('tbody tr').each(function (i, tr) {
			$(tr).find('td').each(function (j, td) {
				$(td).attr('data-title', titles[j]);
			})
		});



	});
};
