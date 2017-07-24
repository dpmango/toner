'use strict';

const moduleName = 'touchTap';

module.exports = function () {
	Array.from(document.querySelectorAll('body')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		let touchMoved;
		let touchstartEvent;



		document.addEventListener('touchstart', (event) => {
			touchMoved = false;
			touchstartEvent = event;
		});

		document.addEventListener('touchmove', () => touchMoved = true);

		document.addEventListener('touchend', () => {
			if (touchMoved) return;

			document.dispatchEvent(new CustomEvent('touchtap', {
				bubbles: true,
				detail: touchstartEvent
			}));
		});



	});
};