'use strict';

const moduleName = 'footerSticky';

module.exports = function () {
	Array.from(document.querySelectorAll('[js-footer-sticky]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper = self;



		document.body.classList.add('styles-for-footer-sticky');

		window.addEventListener('resize', changeMarginForClass);



		function changeMarginForClass() {
			const heightFooter  = wrapper.offsetHeight;
			const styles		= `
				<style id="styles-for-footer-sticky">
					.styles-for-footer-sticky {
						margin-bottom: ${heightFooter}px;
					}
				</style>
			`;

			if (document.querySelector('#styles-for-footer-sticky')) {
				document.querySelector('#styles-for-footer-sticky').remove();
			}

			document.body.insertAdjacentHTML('beforeend', styles);

			wrapper.style.position = 'absolute';
		}

		changeMarginForClass();



	});
};
