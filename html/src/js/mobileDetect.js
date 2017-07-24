'use strict';

const moduleName = 'mobileDetect';

module.exports = function () {
	Array.from(document.querySelectorAll('body')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			document.body.classList.add('mobile');
		}



	});
};