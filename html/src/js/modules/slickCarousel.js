'use strict';

const moduleName = 'slickCarousel';

require('slick-carousel/slick/slick.min.js');
require('slick-carousel/slick/slick.css');

module.exports = function () {
	Array.from(document.querySelectorAll('[js-slider]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper = self;
		const list	  = wrapper.querySelector('[js-slider-list]');



		$(list).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			autoplaySpeed: 5000,
			speed: 600,
			arrows: true,
			dots: true,
			prevArrow: '<button type="button" class="slider__btn slider__btn--prev"></button>',
			nextArrow: '<button type="button" class="slider__btn slider__btn--next"></button>'
		});



	});
};