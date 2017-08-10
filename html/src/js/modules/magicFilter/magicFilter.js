'use strict';

function MagicFilter(wrapper, elements) {
	this._wrapper	     = wrapper;
	this._elements 	     = elements;

	this._input      	 = wrapper.querySelector('[js-magic-filter-input]');

	this._notFoundString = wrapper.querySelector('[js-magicFilter-not-found]');
}



MagicFilter.prototype.initFilter = function () {
	this.doFilter();
};



MagicFilter.prototype.filter = function () {
	this.doFilter();
};



MagicFilter.prototype.doFilter = function () {
	const input      = this._input;
	const inputValue = input.value.toLowerCase().replace(/[^a-z0-9а-я\s]/, '');



	Array.from(this._elements).forEach((self) => {
		const element     = self;
		const elementName = element.dataset['name'];

		if (elementName.indexOf(inputValue) !== -1 || inputValue === '') {
			element.classList.add('visible');
			return;
		}

		element.classList.remove('visible');
	});

	this.showOrHideNotFoundString();
};



MagicFilter.prototype.showOrHideNotFoundString = function () {
	const filteredElements = Array.from(this._elements).filter((item) => {
		return item.classList.contains('visible');
	});

	if (filteredElements.length) {
		this._notFoundString.classList.add('hidden');
	} else {
		this._notFoundString.classList.remove('hidden');

	}
};

module.exports = MagicFilter;