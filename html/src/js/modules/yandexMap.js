'use strict';

const moduleName = 'yandexMap';

const scriptLoader = require('scriptjs');

module.exports = function () {
	Array.from(document.querySelectorAll('[js-yandex-map]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper 		 		 = self;
		const jsonContainer  		 = wrapper.querySelector('[js-yandex-map-json-container]');
		const buttonsOpeningBalloons = wrapper.querySelectorAll('[js-yandex-map-btn-open-balloon]');
		const settings   	 		 = JSON.parse(jsonContainer.innerHTML);
		const scriptLang 	 		 = settings.hasOwnProperty('lang') ? settings.lang : 'ru_RU';
		let	map;
		let ymapsLoaded = false;



		function closureInitYandexMap() {
			ymaps.ready(() => {
				map = new ymaps.Map(jsonContainer.parentNode, $.extend({
					controls : ['zoomControl', 'trafficControl', 'fullscreenControl']
				}, settings.map));

				map.behaviors.disable('scrollZoom');
				map.controls.remove('searchControl');

				document.body.classList.contains('mobile') ? map.behaviors.disable('drag') :undefined;

				settings.placemarks.forEach((item) => {
					const placemark = new ymaps.Placemark(...item);

					map.geoObjects.add(placemark);

					if (buttonsOpeningBalloons) {
						Array.from(buttonsOpeningBalloons).forEach((self) => {
							const btnOpenBalloon = self;

							if (btnOpenBalloon.dataset['id'] === item[1].id) {
								btnOpenBalloon.addEventListener('click', (event) => {
									event.preventDefault();

									!!placemark.balloon.isOpen() ? placemark.balloon.close() : placemark.balloon.open();
								});
							}
						});
					}
				});

				!!jsonContainer.dataset['autocentered'] ? getBounds() : undefined;

				window.addEventListener('click',  () => map.container.fitToViewport());
				window.addEventListener('resize', () => map.container.fitToViewport());

				ymapsLoaded = true;
				document.dispatchEvent(new CustomEvent('yandexMapObjectLoaded'));
			});
		}



		function updatePlacemarks(arrayPlacemarks) {
			yandexMapRemoveAllPlacemarks();

			arrayPlacemarks.forEach(
				item => map.geoObjects.add(new ymaps.Placemark(...item))
			);

			getBounds();
		}



		function getBounds() {
			map.setBounds(map.geoObjects.getBounds(), {
				checkZoomRange:true,
				zoomMargin 	  : 30
			}).then(() => {
				map.getZoom() > 14 ? map.setZoom(14) : undefined;
			});
		}



		window.yandexMapUpdatePlacemarks = (arrayPlacemarks) => {
			if (ymapsLoaded) {
				updatePlacemarks(arrayPlacemarks);
			} else {
				document.addEventListener('yandexMapObjectLoaded', () => {
					updatePlacemarks(arrayPlacemarks);
				});
			}
		};



		window.yandexMapRemoveAllPlacemarks = () => {
			if (ymapsLoaded) {
				map.geoObjects.removeAll();
			} else {
				document.addEventListener('yandexMapObjectLoaded', () => {
					map.geoObjects.removeAll();
				});
			}
		};



		if (typeof window.yandexMapApiLoadingStarted == 'undefined') {
			window.yandexMapApiLoadingStarted = true;
			loadYandexMapApi(closureInitYandexMap);
		} else if (typeof window.yandexMapApiLoaded == 'undefined') {
			document.addEventListener('yandexMapApiLoaded', () => {
				closureInitYandexMap();
			});
		} else {
			closureInitYandexMap();
		}



		function loadYandexMapApi(callbackFunc) {
			window.initYandexMap = callbackFunc;

			scriptLoader('https://api-maps.yandex.ru/2.1/?lang=' + scriptLang, () => {
				window.initYandexMap();
				window.yandexMapApiLoaded = true;
				document.dispatchEvent(new CustomEvent('yandexMapApiLoaded'));
			});
		}



	});
};