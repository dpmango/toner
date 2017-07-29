const src = document.querySelector('[src*="bundle."]').getAttribute('src');
__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1);

let $;

const onDOMContentLoaded = function () {
	require.ensure([
		'babel-polyfill',

		'jquery',

		'./js/polyfills',
		'./js/customMethods',
		'./js/mobileDetect',
		'./js/touchTap',

		'./js/modules/inputMask',
	], (require) => {
		require('babel-polyfill');

		$ = window.jQuery = window.$ = require('jquery');

		require('./js/polyfills')();
		require('./js/customMethods')();
		require('./js/mobileDetect')();
		require('./js/touchTap')();

		window.inputMask = require('./js/modules/inputMask');

		initCustomWidgets();
	});
};

if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
	onDOMContentLoaded();
} else {
	document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}



const initCustomWidgets = window.initCustomWidgets = function () {
	if (document.querySelector('[js-pop-up]')) {
		require.ensure(['./js/modules/popUp'], (require) => require('./js/modules/popUp')());
	}

	if (document.querySelector('input, textarea, select')) {
		require.ensure(['./js/modules/formError'], (require) => require('./js/modules/formError')());
	}

	if (document.querySelector('[js-footer-sticky]')) {
		require.ensure(['./js/modules/footerSticky'], (require) => require('./js/modules/footerSticky')());
	}

	if (document.querySelector('[js-back-to-top]')) {
		require.ensure(['./js/modules/backToTop'], (require) => require('./js/modules/backToTop')());
	}

	if (document.querySelector('a[href^="#anchor-"]')) {
		require.ensure(['./js/modules/scrollingToAnchor'], (require) => require('./js/modules/scrollingToAnchor')());
	}

	if (document.querySelector('[type="tel"]')) {
		window.inputMask();
	}

	if (document.querySelector('[js-responsive-table]')) {
		require.ensure(['./js/modules/responsiveTable'], (require) => require('./js/modules/responsiveTable')());
	}

	if (document.querySelector('[js-yandex-map]')) {
		require.ensure(['./js/modules/yandexMap'], (require) => require('./js/modules/yandexMap')());
	}

	if (document.querySelector('[js-fancybox]')) {
		require.ensure(['./js/modules/fancybox'], (require) => require('./js/modules/fancybox')());
	}

	if (document.querySelector('[js-slider]')) {
		require.ensure(['./js/modules/slickCarousel'], (require) => require('./js/modules/slickCarousel')());
	}

	if (document.querySelector('img[data-src]')) {
		require.ensure(['./js/modules/lazyload'], (require) => require('./js/modules/lazyload')());
	}

	if (document.querySelector('[js-tabs]')) {
		require.ensure(['./js/modules/tabs'], (require) => require('./js/modules/tabs')());
	}

  if (document.querySelector('a[href="#"]')) {
		require.ensure(['./js/modules/preventDefault'], (require) => require('./js/modules/preventDefault')());
	}

	require.ensure(['./styles-entry'], (require) => require('./styles-entry'));
  require.ensure(['./pug-entry'], (require) => require('./pug-entry'));
};
