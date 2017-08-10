'use strict';

const moduleName = 'popUp';

const moduleData = {
	'windowScrollTop'  : undefined,
	'htmlHeight' 	   : undefined
};

module.exports = function () {



	if (!(document.querySelector('[js-overlay]'))) {
		document.body.insertAdjacentHTML('beforeend', '<div class="overlay" js-overlay></div>');
	}



	const body 	  = document.querySelector('body');
	const html 	  = document.querySelector('html');
	const overlay = document.querySelector('[js-overlay]');



	window.addEventListener('resize', () => {
		popUpCentering('[js-pop-up].active');
	});



	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 27 && document.querySelector('[js-pop-up].active')) {
			event.preventDefault();

			hidePopUp();
		}
	});






	Array.from(document.querySelectorAll('[js-pop-up]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const popUp   = self;
		const popUpId = '#' + popUp.getAttribute('id');



		popUp.remove();
		document.body.appendChild(popUp);



		popUp.addEventListener('DOMNodeInserted', () => {
			if (popUp.classList.contains('active')) {
				putFocusFirstVisibleInput(popUpId);
				loadImages(popUpId);
				popUpCentering(popUpId);
			}
		});



		popUp.addEventListener('click', (event) => {
			const element = event.target.closest('[js-pop-up-btn-close]');
			if (!element) return;

			event.preventDefault();
			event.stopPropagation();

			hidePopUp();
		});



		popUp.addEventListener('click', (event) => {
			const element = event.target;
			if (element.closest('[js-pop-up-insides]')) return;

			event.stopPropagation();

			hidePopUp();
		});
	});






	Array.from(document.querySelectorAll('[js-pop-up-btn-open]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		self.addEventListener('click', (event) => {
			const element = event.target.closest('[js-pop-up-btn-open]');
			if (!element) return;

			event.preventDefault();

			const popUpId = element.dataset['popUpId'];

			updateModuleData();
			showPopUp(popUpId);
		});
	});






	function showPopUp(popUpId) {
		const popUp = document.querySelector(popUpId);

		popUp.classList.add('active');
		overlay.classList.add('active');

		putFocusFirstVisibleInput(popUpId);
		loadImages(popUpId);
		popUpCentering(popUpId);

		if (checkOutScrollbar()) body.style.overflowY = 'scroll';

		const styles = `
				<style id="styles-for-pop-up">
					.styles-for-pop-up { 
						position: fixed;
						top:      -${moduleData.windowScrollTop}px;
						width:    100%;
						height:   ${moduleData.htmlHeight}px;
					}
				</style>
			`;

		if (document.querySelector('#styles-for-pop-up')) {
			document.querySelector('#styles-for-pop-up').remove();
		}

		document.body.insertAdjacentHTML('beforeend', styles);
		document.body.classList.add('styles-for-pop-up');
	}



	function checkOutScrollbar() {
		return window.innerWidth > document.documentElement.clientWidth;
	}



	function putFocusFirstVisibleInput(popUpId) {
		if (!(document.body.classList.contains('mobile'))) {
			const popUp = document.querySelector(popUpId);

			Array.from(popUp.querySelectorAll('input')).every((self) => {
				const input = self;

				if (input.getAttribute('type') !== 'hidden' && input.value === '') {
					input.focus();
					return false;
				} else {
					return true;
				}
			});
		}
	}



	function loadImages(popUpId) {
		const images = document.querySelectorAll('[js-pop-up].active img');
		const image  = new Image();

		Array.from(images).forEach((self) => {
			image.onload = () => {
				popUpCentering(popUpId);
			};

			image.onerror = () => {
				popUpCentering(popUpId);
			};

			image.src = self.getAttribute('src');
		});
	}



	function hidePopUp() {
		body.style.overflowY = 'auto';

		const activePopUp = document.querySelector('[js-pop-up].active');

		!!activePopUp ? activePopUp.classList.remove('active') : undefined;

		overlay.classList.remove('active');

		document.body.classList.remove('styles-for-pop-up');

		$('html, body').animate({scrollTop: moduleData.windowScrollTop}, 0);
	}



	function popUpCentering(popUpId) {
		Array.from(document.querySelectorAll(popUpId)).forEach((self) => {
			const popUp = self;

			if (!popUp.querySelector('[js-pop-up-insides]')) return;

			const popUpInsides       = popUp.querySelector('[js-pop-up-insides]');
			const popUpInsidesHeight = popUpInsides.offsetHeight;
			const windowHeight       = window.innerHeight;

			if (windowHeight - 80 < popUpInsidesHeight) {
				popUpInsides.style.marginTop 	= '40px';
				popUpInsides.style.marginBottom = '40px';
			} else {
				popUpInsides.style.marginTop 	= (windowHeight - popUpInsidesHeight) / 2 + 'px';
				popUpInsides.style.marginBottom = (windowHeight - popUpInsidesHeight) / 2 + 'px';
			}
		});
	}



	function updateModuleData() {
		moduleData.windowScrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
		moduleData.htmlHeight 	   = document.querySelector('html').offsetHeight;
	}






	window.showPopUp = (popUpId) => {
		updateModuleData();
		showPopUp(popUpId);
	};



};