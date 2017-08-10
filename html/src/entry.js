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
		'./js/callbackBuffer',

		'./js/modules/inputMask',
		'./js/modules/datepicker',
	], (require) => {
		require('babel-polyfill');

		$ = window.jQuery = window.$ = require('jquery');

		require('./js/polyfills')();
		require('./js/customMethods')();
		require('./js/mobileDetect')();
		require('./js/touchTap')();

		window.inputMask = require('./js/modules/inputMask');
		window.datepicker = require('./js/modules/datepicker');

		initCustomWidgets();

		const CallbackBuffer  = require('./js/callbackBuffer');
		window.callbackBuffer = new CallbackBuffer(window.callbackBuffer || []);
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

	if (document.querySelector('[type="tel"]')) {
		window.inputMask();
	}

	if (document.querySelector('[js-responsive-table]')) {
		require.ensure(['./js/modules/responsiveTable'], (require) => require('./js/modules/responsiveTable')());
	}

	if (document.querySelector('[js-yandex-map]')) {
		require.ensure(['./js/modules/yandexMap'], (require) => require('./js/modules/yandexMap')());
	}

	if (document.querySelector('[js-magic-filter]')) {
		require.ensure(['./js/modules/magicFilter'], (require) => require('./js/modules/magicFilter')());
	}

  if (document.querySelector('[js-quick-search]')) {
		require.ensure(['./js/modules/quickSearch'], (require) => require('./js/modules/quickSearch')());
	}

  if (document.querySelector('[js-footer-sticky]')) {
		require.ensure(['./js/modules/footerSticky'], (require) => require('./js/modules/footerSticky')());
	}

  if (document.querySelector('[js-fancybox]')) {
		require.ensure(['./js/modules/fancybox'], (require) => require('./js/modules/fancybox')());
	}

  if (document.querySelector('[js-datepicker]')) {
		window.datepicker();
	}

  if (document.querySelector('[js-mobile-menu]')) {
		require.ensure(['./js/modules/hamburgerMobile'], (require) => require('./js/modules/hamburgerMobile')());
	}

	require.ensure(['./styles-entry'], (require) => require('./styles-entry'));
};
